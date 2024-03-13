import styles from "../../dashboard/dashboard.module.css";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";
import { playTrack } from "../../lib/spotty";

export default function Track({ track, index, session }) {
  // console.log({ track });
  const convertDurationToMinutes = (durationInMs) => {
    const durationInMinutes = durationInMs / 60000;
    const minutes = Math.floor(durationInMinutes);
    const seconds = Math.floor((durationInMinutes - minutes) * 60);
    // dont truncate the 0 off seconds if it is less than 10
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const handleTrackPlayClick = (track) => {
    playTrack(track, session);
    // console.log({ session });
  };
  return (
    <div className={styles.track}>
      <p className={styles.trackNumber}>{index + 1}</p>
      <IoIosPlayCircle
        className={styles.playIcon}
        onClick={() => handleTrackPlayClick(track)}
      />
      <Image
        width={64}
        height={64}
        src={track.album.images[2].url}
        alt="Profile picture"
      />
      <div className={styles.nameAndArtist}>
        <p className={styles.trackName}>{track.name}</p>
        <p className={styles.artistName}>{track.artists[0].name}</p>
      </div>

      <div className={styles.duration}>
        <p>{convertDurationToMinutes(track.duration_ms)}</p>
      </div>
    </div>
  );
}
