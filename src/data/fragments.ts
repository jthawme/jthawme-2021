import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export const query = graphql`
  fragment DirectUrl on File {
    publicURL
  }

  fragment JTLargeFluidImage on File {
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

export const getImageFromSrc = (
  src: FileFluidImage | { publicURL: string },
): string => {
  if (!src) {
    return undefined;
  }

  return "childImageSharp" in src
    ? src.childImageSharp.fluid.src
    : src.publicURL;
};

export interface FileDirectUrl {
  publicURL: string;
}

export interface FileFluidImage {
  childImageSharp: {
    fluid: FluidObject;
  };
}
