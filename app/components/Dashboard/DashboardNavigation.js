"use client";
import styles from "../../dashboard/dashboard.module.css";
import { FaSpotify } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import cx from "@/app/lib/cx";
import { useState } from "react";
export default function DashboardNavigation({ setView, view, data }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  console.log({ data });

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className={styles.navigationBar}>
      <div className={styles.logo}>
        <FaSpotify className={styles.logoIcon} />
        <p>Spotify</p>
      </div>
      <hr />
      <div className={styles.navLinkContainer}>
        <ul className={styles.navLinks}>
          <li
            className={
              view === "topTracks"
                ? cx(styles.listItem, styles.active)
                : styles.listItem
            }
            onClick={() => setView("topTracks")}
          >
            Top Tracks
          </li>
          <li
            className={
              view === "topArtists"
                ? cx(styles.listItem, styles.active)
                : styles.listItem
            }
            onClick={() => setView("topArtists")}
          >
            Top Artists
          </li>
          <li
            className={
              view === "playlists"
                ? cx(styles.listItem, styles.active)
                : styles.listItem
            }
          >
            <span onClick={() => handleOpenDropdown()}>
              Playlists{" "}
              <IoIosArrowDropdownCircle
                className={
                  openDropdown
                    ? cx(styles.dropdownIcon, styles.dropdownIconOpen)
                    : styles.dropdownIcon
                }
              />
            </span>
            <ul
              className={
                openDropdown
                  ? cx(styles.dropdownMenu, styles.openDropdownMenu)
                  : styles.dropdownMenu
              }
            >
              {data !== null &&
                data?.playlistData?.map((playlist, index) => (
                  <li key={index} className={styles.dropListItem}>
                    {playlist.name}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
