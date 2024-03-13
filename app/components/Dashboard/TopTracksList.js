"use client";
import TopTracksTabs from "./TopTracksTabs";
import styles from "../../dashboard/dashboard.module.css";
import Track from "./Track";
import { useState } from "react";

// destructure trackData from data, and then fourWeeks, sixMonths, and allTime from trackData
export default function TopTracksList({
  data: {
    trackData: { fourWeeks, sixMonths, allTime },
  },
  session,
}) {
  const [activeTab, setActiveTab] = useState("4 Weeks");
  console.log(
    { fourWeeks, sixMonths, allTime },
    " In the top tracks list component"
  );
  return (
    <section className={styles.topTracksSection}>
      <TopTracksTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.topTracksList}>
        {activeTab === "4 Weeks" &&
          fourWeeks?.items?.map((track, index) => (
            <Track key={index} index={index} track={track} session={session} />
          ))}
        {activeTab === "6 Months" &&
          sixMonths?.items?.map((track, index) => (
            <Track key={index} index={index} track={track} session={session} />
          ))}
        {activeTab === "All Time" &&
          allTime?.items?.map((track, index) => (
            <Track key={index} index={index} track={track} session={session} />
          ))}
      </div>
    </section>
  );
}
