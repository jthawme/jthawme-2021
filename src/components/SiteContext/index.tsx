import { PageProps } from "gatsby";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BgImage } from "../BgImage";
import { Album } from "../MusicList";

interface SiteContextData {
  dark?: boolean;
  tracks: Album[];
  setTracks: (tracks: Album[]) => void;
  bgImage?: string;
  setBgImage: (img: string) => void;
  setBgHandlers: (
    img: string,
  ) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  } | null;
}

const SiteContext = createContext<SiteContextData>({
  dark: false,
  tracks: [],
  setTracks: () => false,
  setBgImage: () => false,
  setBgHandlers: () => ({
    onMouseEnter: () => false,
    onMouseLeave: () => false,
  }),
});

const SiteContainer: React.FC<{ location: PageProps["location"] }> = ({
  children,
  location,
}) => {
  const [dark, setDark] = useState(false);
  const [tracks, setTracks] = useState<Album[]>([]);
  const [bgImage, setBgImage] = useState<string | undefined>();

  useEffect(() => {
    setDark(location.pathname === "/professional");
    setBgImage(undefined);
  }, [location.pathname]);

  useEffect(() => {
    // document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const setBgHandlers = useCallback((image?: string) => {
    if (!image) {
      return null;
    }

    return {
      onMouseEnter: () => setBgImage(image),
      onMouseLeave: () => setBgImage(undefined),
    };
  }, []);

  return (
    <SiteContext.Provider
      value={{ dark, tracks, setTracks, bgImage, setBgImage, setBgHandlers }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = (): SiteContextData => useContext(SiteContext);

export { SiteContainer, useSiteContext };
