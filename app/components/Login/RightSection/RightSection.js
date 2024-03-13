import Link from "next/link";
import styles from "./rightSection.module.css";
import { FaSpotify } from "react-icons/fa";
export default function RightSection() {
  return (
    <div className={styles.rightSection}>
      <div className={styles.rightSectionContainer}>
        <FaSpotify className={styles.spotifyIcon} />
        <h2>Sign in to view the trajectory of your Spotify Wrapped.</h2>
        <Link href="/api/auth/signin" className={styles.loginButton}>
          Sign in with Spotify
        </Link>
      </div>
    </div>
  );
}
