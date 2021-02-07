import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

import socialImg from "../../images/social.png";

type MetaTags = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>;

interface SEOProps {
  lang?: string;
  title?: string;
  description?: string;
  meta?: MetaTags[];
  image?: string;
  urlPath?: string;
}

const prefixSite = (url: string): string => {
  return url.substring(4) !== "http" ? `https://jthaw.me${url}` : url;
};

const SEO: React.FC<SEOProps> = ({
  lang = "en",
  title,
  description,
  meta = [],
  image = socialImg,
  urlPath = "/",
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const url = `${site.siteMetadata.siteUrl}${urlPath}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s — ${site.siteMetadata.title}`}
      meta={([
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: url,
        },
        {
          property: `og:image`,
          content: prefixSite(image),
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: "@jthawme",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          property: `twitter:url`,
          content: url,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: prefixSite(image),
        },
      ] as MetaTags[]).concat(meta)}
    >
      {children}
    </Helmet>
  );
};

export { SEO };
