import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-currently-playing,user-read-recently-played,user-top-read,user-read-email,user-read-private,user-modify-playback-state",
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // to control if a user is allowed to sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at,
          user,
        };
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // this callback is called whenever a JSON web token is created (i.e, at sign in) or updated (i.e, whenever a session is accessed in the client). The returned value will be encrypted, and is stored in a cookie.
      // Requests to /api/auth/signin, /api/auth/session and calls to getSession(), getServerSession(), and useSession() will invoke this function, but only if you are using a JWT session. This method is not invoked when you persist sessions in a database.
      // The arguments user, account, profile, and isNewUser are only passed the first time this callback is called on a new session, after the user signs in. In subsquent calls, only the token argument is passed.
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = profile.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      // the session callback is called whenever a session is checked (getSession(), useSession(), and /api/auth/session). By default, only a subset of the token is returned for increased security. If you want to mak something available you added to the token (like access_token and profile.id) via the JWT callback, you have to explicitly forward it here to make it available to the client.
      //   console.log(`THE SESSION: ${session}`);
      //   console.log(`THE TOKEN: ${token}`);
      session.accessToken = token?.accessToken;
      session.refreshToken = token?.refreshToken;
      session.user.id = token.id;
      console.log({
        ...session,
        ...token,
      });
      return {
        ...session,
        ...token,
      };
      //   return session;
    },
  },
};
