import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./UpdatesPagination.module.scss";
import { MicroUpdatePropsData } from "../MicroUpdate";
import { timer } from "../../utils/promises";
import { isPast } from "date-fns";

interface UpdatesPaginationProps {
  className?: string;
  onNewPosts?: (items: MicroUpdatePropsData[]) => void;
  loadDebounce?: number;
}

const UpdatesPagination: React.FC<UpdatesPaginationProps> = ({
  className,
  onNewPosts,
  loadDebounce = 1000,
}) => {
  const onEntries = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries.filter((e) => e.isIntersecting).length === entries.length) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const io = useRef<IntersectionObserver>();
  const page = useRef<number>(1);

  const [infinite, setInfinite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [finished, setFinished] = useState(false);

  const toggleInfiniteScroll = useCallback(() => {
    setInfinite((state) => !state);
  }, []);

  const onRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      io.current = new IntersectionObserver(onEntries, {
        threshold: 0,
      });
      io.current.observe(ref);
    } else {
      io.current.disconnect();
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      fetch(`/.netlify/functions/more?page=${page.current + 1}`)
        .then((resp) => resp.json())
        .then((obj) => {
          if (obj.data && obj.data.length) {
            onNewPosts(obj.data);

            setTimeout(() => {
              page.current += 1;
              setLoading(false);
            }, loadDebounce);
          } else {
            setLoading(false);
            setInfinite(false);
            setFinished(true);
          }
        });
    }
  }, [loading, loadDebounce]);

  useEffect(() => {
    if (visible && infinite && !loading) {
      loadMore();
    }
  }, [visible, infinite, loading, loadMore]);

  useEffect(() => {
    if (infinite) {
      const cb = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setInfinite(false);
        }
      };

      document.addEventListener("keyup", cb, false);

      return () => document.removeEventListener("keyup", cb);
    }
  }, [infinite]);

  return (
    <section ref={onRef} className={classNames(styles.pagination, className)}>
      {finished && <span className={styles.help}>End of the road</span>}

      {loading && <span>loading more posts...</span>}

      {!loading && !finished && (
        <div className={styles.actions}>
          <button onClick={loadMore}>Load more</button>
          <span>or</span>
          <button onClick={toggleInfiniteScroll}>
            {infinite ? "Turn off scroll" : "Scroll to load"}
          </button>
        </div>
      )}

      {infinite && (
        <span className={styles.help}>
          Press the <em>ESCAPE</em> key, to turn off scroll to load
        </span>
      )}
    </section>
  );
};

export { UpdatesPagination };
