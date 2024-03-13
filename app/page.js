"use client";
import styles from "./styles/pages/Login.module.css";
import RightSection from "./components/Login/RightSection/RightSection";
import LeftSection from "./components/Login/LeftSection/LeftSection";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session === undefined || status === "unauthenticated") {
      return;
    } else {
      redirect("/dashboard");
    }
  }, [session]);

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.responsiveLogin}>
          <div className={styles.responsiveLoginHeader}>
            <h1>Unwrap your tracks early.</h1>
          </div>
          <div className={styles.darkSigninBox}>
            <FaSpotify className={styles.spotifyIcon} />
            <h2>Sign in to view the trajectory of your Spotify Wrapped.</h2>
            {/* <button onClick={() => signIn("spotify")}>login</button> */}
            <Link
              // onClick={() => signIn("spotify")}
              href="/api/auth/signin"
              className={styles.loginButton}
            >
              Sign in with Spotify
            </Link>
          </div>
        </div>
        <LeftSection />
        <RightSection />
      </div>
      <div className={styles.loginFooter}>
        <FaSpotify className={styles.spotifyIcon} />
        <p>Spotify</p>
      </div>
    </main>
  );
}
