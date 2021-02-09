import React, { useMemo } from "react";
import classNames from "classnames";
import { VideoPlayer } from "../VideoPlayer";

import styles from "./Embed.module.scss";

enum EmbedType {
  CodeSandbox = "codesandbox",
  Video = "video",
  Youtube = "youtube",
}

const CODE_SANDBOX_REGEX = /codesandbox.io\/s\/([a-z0-9]+)/;
const YOUTUBE_REGEX = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;

interface EmbedProps {
  className?: string;
  src: string;
}

type CodeSandboxEmbed = {
  type: EmbedType.CodeSandbox;
  data: {
    id: string;
  };
};

type VideoEmbed = {
  type: EmbedType.Video;
  data: {
    src: string;
  };
};

type YoutubeEmbed = {
  type: EmbedType.Youtube;
  data: {
    id: string;
  };
};

type TypeParams = CodeSandboxEmbed | VideoEmbed | YoutubeEmbed;

const Embed: React.FC<EmbedProps> = ({ src, className }) => {
  const params = useMemo<TypeParams | false>(() => {
    if (src.includes(".mp4")) {
      return {
        type: EmbedType.Video,
        data: {
          src,
        },
      };
    }

    if (src.match(CODE_SANDBOX_REGEX)) {
      const [full, id] = src.match(CODE_SANDBOX_REGEX);
      return {
        type: EmbedType.CodeSandbox,
        data: {
          id,
        },
      };
    }

    if (src.match(YOUTUBE_REGEX)) {
      const [full, id] = src.match(YOUTUBE_REGEX);

      return {
        type: EmbedType.Youtube,
        data: {
          id,
        },
      };
    }
    return false;
  }, [src]);

  const cls = classNames(className);

  if (!params) {
    return null;
  }

  if (EmbedType.CodeSandbox === params.type) {
    return (
      <div className={styles.embedWrapper}>
        <iframe
          className={cls}
          src={`https://codesandbox.io/embed/${params.data.id}?fontsize=14&hidenavigation=1&hidedevtools=1&codemirror=1&view=preview&theme=dark`}
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: "4px",
            overflow: "hidden",
          }}
          title={params.data.id}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      </div>
    );
  }

  if (EmbedType.Youtube === params.type) {
    return (
      <div className={styles.embedWrapper}>
        <iframe
          width="560"
          height="315"
          style={{
            width: "100%",
            height: "100%",
            border: 0,
            borderRadius: "4px",
            overflow: "hidden",
          }}
          src={`https://www.youtube.com/embed/${params.data.id}?rel=0&controls=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (EmbedType.Video === params.type) {
    return <VideoPlayer className={cls} {...params.data} />;
  }
};

export { Embed };
