import styles from "../../dashboard/dashboard.module.css";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";

export default function DashboardHeader({ data }) {
  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.greetingImageContainer}>
        <div className={styles.profileImageContainer}>
          <Image
            width={300}
            height={182}
            src={data?.profileData?.images[1]?.url}
            alt={`Photo of ${data?.profileData?.display_name}`}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.greetingContainer}>
          <p>Hey,</p>
          <h1>{data.profileData.display_name}.</h1>
          <p>Here's what we could gather.</p>
        </div>
      </div>
      <div className={styles.logo}>
        <FaSpotify className={styles.logoIcon} />
        <p>Spotify</p>
      </div>
    </header>
  );
}
