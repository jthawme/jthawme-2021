import React, { useEffect, useState } from "react";
import classNames from "classnames";
import format from "date-fns/format";

import styles from "./MusicList.module.scss";

interface MusicListProps {
  limit?: number;
  className?: string;
}

type Album = {
  id: string;
  artist: string;
  album: string;
  artwork: string;
  date: Date;
};

const MusicList: React.FC<MusicListProps> = ({ limit = 5, className }) => {
  const [tracks, setTracks] = useState<Album[]>([]);

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
            artwork: (track.image.find((img) => img.size === "large") ||
              track.image.pop())["#text"],
            date: new Date(track.date["#text"]),
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
      {tracks.map((track) => (
        <div key={track.id} className={styles.row}>
          <div className={styles.rowTitle}>{track.artist}</div>
          <div className={styles.rowSubtitle}>{track.album}</div>
          <div className={styles.rowDate}>
            {format(track.date, "d LLL kk:mm")}
          </div>
        </div>
      ))}
    </div>
  );
};

export { MusicList };
