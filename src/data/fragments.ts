import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export const query = graphql`
  fragment DirectUrl on File {
    publicURL
  }

  fragment JTLargeFluidImage on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 1200) {
        src
        aspectRatio
      }
    }
  }

  fragment JTFluidImage on File {
    childImageSharp {
      fluid(maxWidth: 700) {
        src
        aspectRatio
      }
    }
  }
`;

export const getAspectRatioFromSrc = (
  src: FileFluidImage | { publicURL: string },
): number | undefined => {
  if (!src) {
    return undefined;
  }

  return "childImageSharp" in src && src.childImageSharp
    ? src.childImageSharp.fluid.aspectRatio
    : undefined;
};

export const getImageFromSrc = (
  src: FileFluidImage | { publicURL: string },
): string | undefined => {
  if (!src) {
    return undefined;
  }

  return "childImageSharp" in src && src.childImageSharp
    ? src.childImageSharp.fluid.src
    : src.publicURL;
};

export interface FileDirectUrl {
  publicURL: string;
}

export interface FileFluidImage {
  publicURL: string;
  childImageSharp?: {
    fluid: FluidObject;
  };
}
