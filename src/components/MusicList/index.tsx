import React, { useEffect, useState } from "react";
import classNames from "classnames";
import format from "date-fns/format";

import styles from "./MusicList.module.scss";
import { useSiteContext } from "../SiteContext";

interface MusicListProps {
  limit?: number;
  className?: string;
}

export type Album = {
  id: string;
  artist: string;
  album: string;
  artwork: string;
  name: string;
  date: Date;
};

const MusicList: React.FC<MusicListProps> = ({ limit = 5, className }) => {
  const { tracks, setTracks, setBgHandlers } = useSiteContext();

  useEffect(() => {
    const controller = new AbortController();

    const getTracks = async () => {
      const signal = controller.signal;

      const { recenttracks } = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jawknee4&api_key=fc9a1cb8bc3ba37735ff3941152cb985&format=json&limit=${limit}`,
        {
          signal,
        },
      ).then((resp) => resp.json());

      setTracks(
        recenttracks.track.map((track) => {
          return {
            id: track.mbid,
            artist: track.artist["#text"],
            album: track.album["#text"],
            name: track.name,
            artwork: track.image.pop()["#text"],
            date: track["@attr"]
              ? "Playing now"
              : format(new Date(track.date["#text"]), "d LLL kk:mm"),
          };
        }),
      );
    };

    const timer = setInterval(() => {
      getTracks();
    }, 30000);

    getTracks();

    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, [limit]);

  return (
    <div className={classNames(styles.list, className)}>
      {tracks.length === 0 && <span>Asking señor last.fm for tracks...</span>}
      {tracks.map((track) => (
        <div
          key={`${track.id}-${track.date}`}
          className={styles.row}
          {...setBgHandlers(track.artwork)}
        >
          <div className={styles.rowArtwork}>
            <img src={track.artwork} />
          </div>
          <div className={styles.rowTitle}>{track.name}</div>
          <div className={styles.rowSubtitle}>{track.artist}</div>
          <div className={styles.rowSubtitle}>{track.album}</div>
          <div className={styles.rowDate}>{track.date}</div>
        </div>
      ))}
    </div>
  );
};

export { MusicList };
