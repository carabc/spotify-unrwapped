"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../dashboard/dashboard.module.css";
import cx from "../../lib/cx";

export default function TopTracksTabs({ activeTab, setActiveTab }) {
  return (
    <div className={styles.topTracksTabsContainer}>
      <ul className={styles.topTracksTabs}>
        <li
          onClick={() => setActiveTab("4 Weeks")}
          className={
            activeTab === "4 Weeks" ? cx(styles.tab, styles.active) : styles.tab
          }
        >
          Last 4 Weeks
          {activeTab === "4 Weeks" && (
            <motion.div className={styles.underline} layoutId="underline" />
          )}
        </li>
        <li
          onClick={() => setActiveTab("6 Months")}
          className={
            activeTab === "6 Months"
              ? cx(styles.tab, styles.active)
              : styles.tab
          }
        >
          Last 6 Months
          {activeTab === "6 Months" && (
            <motion.div className={styles.underline} layoutId="underline" />
          )}
        </li>
        <li
          onClick={() => setActiveTab("All Time")}
          className={
            activeTab === "All Time"
              ? cx(styles.tab, styles.active)
              : styles.tab
          }
        >
          All Time
          {activeTab === "All Time" && (
            <motion.div className={styles.underline} layoutId="underline" />
          )}
        </li>
      </ul>
    </div>
  );
}
