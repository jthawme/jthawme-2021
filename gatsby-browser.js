import React from "react";
import { Layout } from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const shouldUpdateScroll = ({ routerProps, getSavedScrollPosition }) => {
  if (routerProps.location.action === "PUSH") {
    // new place
    window.scrollTo({
      x: 0,
      y: 0,
      behavior: "smooth",
    });
  } else {
    const savedPosition = getSavedScrollPosition(routerProps.location);
    setTimeout(
      () =>
        window.scrollTo({
          ...savedPosition,
          behavior: "smooth",
        }),
      250,
    );
  }

  return false;
};
