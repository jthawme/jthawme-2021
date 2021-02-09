import React from "react";
import smoothscroll from "smoothscroll-polyfill";
import { Layout } from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const onClientEntry = () => {
  smoothscroll.polyfill();
};

export const shouldUpdateScroll = ({ routerProps, getSavedScrollPosition }) => {
  if (routerProps.location.action === "PUSH") {
    window.scroll({
      top: 0,
      left: 0,
    });
  } else {
    const savedPosition = getSavedScrollPosition(routerProps.location);
    setTimeout(
      () =>
        window.scroll({
          ...savedPosition,
          behavior: "smooth",
        }),
      250,
    );
  }

  return false;
};
