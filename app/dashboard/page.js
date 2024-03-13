"use client";
import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
// import { fetchData } from "../lib/spotty";
import useData from "../lib/useData";

// React Components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardContent from "../components/Dashboard/DashboardContent";
import Loading from "../components/Loading/Loading";
import DashboardNavigation from "../components/Dashboard/DashboardNavigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const data = useData(session);
  const [view, setView] = useState("topTracks");

  // check if the user is authenticated
  useEffect(() => {
    if (session === undefined || status === "unauthenticated") {
      redirect("/");
    }
  }, [status, data]);

  console.log(`The data on dashboard: ${data}`);

  if (session === undefined || data === null) {
    return <Loading />;
  } else {
    return (
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <div className={styles.dashboardNavigation}>
            <DashboardNavigation view={view} setView={setView} data={data} />
          </div>
          <div className={styles.dashboardContent}>
            <DashboardContent data={data} view={view} session={session} />
          </div>
        </div>
      </div>
    );
  }
}
