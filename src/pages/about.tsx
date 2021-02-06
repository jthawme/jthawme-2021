import React from "react";
import Helmet from "react-helmet";
import { PageProps } from "gatsby";
import { TextBlock } from "../components/TextBlock";
import { ContentContainer } from "../components/ContentContainer";

import styles from "../styles/pages/About.module.scss";
import { MusicList } from "../components/MusicList";

const AboutPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet title="About" />
      <ContentContainer>
        <TextBlock className={styles.intro}>
          {`My name is _Jonny Thaw_ + I love coding. I have a love/hate relationships with websites, but I'll happily make ya one, what one do ya want?
          
I love music and I really obsessively make work, those facts never change. I wish I could skateboard and I wish I was more brave (probably related).

Below are the last tracks that I listened to on Spotify, lets go toe to toe on music taste.`}
        </TextBlock>

        <MusicList limit={10} />
      </ContentContainer>
    </>
  );
};

export default AboutPage;
