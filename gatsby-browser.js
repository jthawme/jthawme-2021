import React from "react";
import { Layout } from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;

export const shouldUpdateScroll = ({ routerProps, getSavedScrollPosition }) => {
    if (routerProps.location.action === "PUSH") {
        // new place
        window.scrollTo(0, 0);
    } else {
        const savedPosition = getSavedScrollPosition(routerProps.location);
        setTimeout(() => animateScrollTo(savedPosition), 250);
    }

    return false;
};
