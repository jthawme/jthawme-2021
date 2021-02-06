import { PageProps } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";
import { MicroUpdate } from "../components/MicroUpdate";

const TEST_TEXT = `
## This is some test text

and its a chance to see how it may respond to mad things, like for instance a http://google.com link just here


or maybe another para _like_ this, not exactly this but **like it**`;

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet title="Home" />
      <ContentContainer>
        <MicroUpdate
          date={new Date().getTime()}
          title="This is a title"
          media={[
            {
              embed: "https://www.youtube.com/watch?v=5BRZoqUTD5M",
            },
          ]}
        />
        <MicroUpdate
          date={new Date().getTime()}
          title="This is a title"
          media={[
            {
              image: { src: "https://pbs.twimg.com/media/Dy5Jp3TXQAA-yek.jpg" },
            },
          ]}
          body={TEST_TEXT}
        />
        <MicroUpdate
          date={new Date().getTime()}
          title="This is a title"
          body={TEST_TEXT}
        />
        <MicroUpdate
          date={new Date().getTime()}
          title="This is a title"
          media={[
            {
              image: { src: "https://pbs.twimg.com/media/EOMgKzKX4AAz7BB.jpg" },
            },
          ]}
        />
      </ContentContainer>
    </>
  );
};

export default IndexPage;
