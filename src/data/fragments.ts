import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";

export const query = graphql`
  fragment DirectUrl on File {
    publicURL
  }

  fragment JTLargeFluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }

  fragment JTFluidImage on File {
    childImageSharp {
      fluid(maxWidth: 700) {
        ...GatsbyImageSharpFluid
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
