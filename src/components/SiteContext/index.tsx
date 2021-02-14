import { PageProps } from "gatsby";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { clamp, tickUpdate } from "../../utils/utils";
import { BgImage } from "../BgImage";
import { Album } from "../MusicList";

interface SiteContextData {
  dark?: boolean;
  tracks: Album[];
  setTracks: (tracks: Album[]) => void;
  bgImage?: string;
  setBgImage: (img: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setBgHandlers: (
    img: string,
  ) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  } | null;
  menuPinned: boolean;
}

const SiteContext = createContext<SiteContextData>({
  dark: false,
  menuOpen: false,
  tracks: [],
  setTracks: () => false,
  setBgImage: () => false,
  setMenuOpen: () => false,
  setBgHandlers: () => ({
    onMouseEnter: () => false,
    onMouseLeave: () => false,
  }),
  menuPinned: true,
});

const SiteContainer: React.FC<{ location: PageProps["location"] }> = ({
  children,
  location,
}) => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(true);
  const [tracks, setTracks] = useState<Album[]>([]);
  const [bgImage, setBgImage] = useState<string | undefined>();

  useEffect(() => {
    setDark(location.pathname === "/professional");
    setBgImage(undefined);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let lastY = 0;
    let distance = 0;
    // let direction = 0;

    const cb = tickUpdate(() => {
      const deltaY = window.scrollY - lastY;
      distance = clamp(distance + deltaY, -50, 50);

      setMenuPinned(window.scrollY < 100 || distance <= 0);

      lastY = window.scrollY;
    });

    window.addEventListener("scroll", cb, { passive: false });

    return () => window.removeEventListener("scroll", cb);
  }, []);

  // useEffect(() => {
  //   // document.documentElement.classList.toggle("dark", dark);
  // }, [dark]);

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
      value={{
        dark,
        tracks,
        setTracks,
        bgImage,
        setBgImage,
        setBgHandlers,
        menuOpen,
        setMenuOpen,
        menuPinned,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const useSiteContext = (): SiteContextData => useContext(SiteContext);

export { SiteContainer, useSiteContext };
