import styles from "../../dashboard/dashboard.module.css";
import TopTracksList from "./TopTracksList";
import TopArtistsList from "./TopArtistsList";
export default function DashboardContent({ data, view, session }) {
  if (data === undefined) {
    return (
      <div>
        <h1>One sec...</h1>
      </div>
    );
  } else {
    return (
      <main className={styles.dashboardContentContainer}>
        {view === "topTracks" && (
          <TopTracksList data={data} session={session} />
        )}
        {view === "topArtists" && <TopArtistsList data={data} />}
        {/* <TopArtistsList /> */}
      </main>
    );
  }
}
