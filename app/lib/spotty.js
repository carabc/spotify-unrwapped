const fetchNewAccessToken = async (refreshToken, clientID, clientSecret) => {
  let basic = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
  // ?grant_type=client_credentials   <-- bad turkee
  const paramString = `grant_type=refresh_token&refresh_token=${refreshToken}`;
  const searchParams = new URLSearchParams(paramString);
  let res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: searchParams,
  });

  return res.json();
};

export const fetchData = async (session) => {
  // get the users top tracks
  let [topPlayedFourWeeks, topPlayedSixMonths, topPlayedAllTime] =
    await fetchTrackData(session.accessToken);

  let trackData = {
    fourWeeks: topPlayedFourWeeks,
    sixMonths: topPlayedSixMonths,
    allTime: topPlayedAllTime,
  };
  console.log({ trackData });
  // check if the access token is expired
  if ("error" in trackData) {
    if (
      trackData?.error?.status === 401 ||
      trackData?.error?.message === "The access token expired"
    ) {
      let newToken = await fetchNewAccessToken(
        session.refreshToken,
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
      );

      session.accessToken = newToken.access_token;

      //refetch trackData
      trackData = await fetchTrackData(session.accessToken);
      trackData = await trackData.json();
    }
  }
  // get the users profile
  let profileData = await fetchProfileData(session.id, session.accessToken);
  // get the users top artists
  let artistData = await fetchArtistData(session.accessToken);
  // get the users playlists
  let playlistData = await fetchPlaylistData(session.id, session.accessToken);
  // promise.all to get all data
  let data = await Promise.all([profileData.json(), artistData.json()]);

  // name each of the objects inside of data and return them
  [profileData, artistData] = data;

  // return all data
  return {
    profileData,
    trackData,
    artistData,
    playlistData,
  };
};

export const playTrack = async (track, session) => {
  let body = {
    uris: [track.uri],
    offset: {
      position: 0,
    },
    position_ms: 0,
  };
  body = JSON.stringify(body);
  try {
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
  } catch (error) {
    console.log(`ERR!!`, error);
  }
};

const fetchTrackData = async (accessToken) => {
  let topPlayedFourWeeks = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  let topPlayedSixMonths = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  let topPlayedAllTime = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  let topTracks = await Promise.all([
    topPlayedFourWeeks.json(),
    topPlayedSixMonths.json(),
    topPlayedAllTime.json(),
  ]);

  return ([topPlayedFourWeeks, topPlayedSixMonths, topPlayedAllTime] =
    topTracks);
};

const fetchProfileData = async (id, accessToken) => {
  return fetch(`https://api.spotify.com/v1/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

const fetchArtistData = async (accessToken) => {
  return fetch(`https://api.spotify.com/v1/me/top/artists?limit=10`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
const fetchPlaylistData = async (id, accessToken) => {
  let data = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  data = await data.json();

  // loop through all of the items, get the tracks property, and fetch the tracks
  let tracksArr = data.items.reduce((acc, currentItem, index) => {
    // see if the playlist is in the array
    let foundItem = acc.find((item) => item.name === currentItem.name);

    // if it isn't in the array
    if (foundItem === undefined) {
      // create the object
      let objToPush = {
        name: currentItem.name,
        totalTracks: currentItem.tracks.total,
        tracks: fetch(currentItem.tracks.href, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }),
      };

      // push the object onto the array
      acc.push(objToPush);
    } else {
      return acc;
    }

    return acc;
  }, []);

  return getPlaylistTracks(tracksArr);
};

const getPlaylistTracks = async (playlists) => {
  // loop through the playlists and await each promise
  let finalPlaylists = await Promise.all(
    playlists.map(async (playlist) => {
      let tracks = await playlist.tracks;
      tracks = await tracks.json();
      // console.log({ tracks });
      playlist.tracks = tracks.items;
      return playlist;
    })
  );

  return finalPlaylists;
};
