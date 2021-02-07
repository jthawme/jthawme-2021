import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { InlineHover } from "../InlineHover";
import { InternalExternalLink } from "../InternalExternalLink";

interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children, ...props }) => {
  const renderers = {
    // use delete for something cool?
    delete: ({ children }) => <InlineHover text={children} />,
    code: ({ language, children }) => {
      // use code fence blocks to do something very specific
      if (language) {
        return <>{language}</>;
      }

      return <code>{children}</code>;
    },
    link: ({ children, href }) => {
      return <InternalExternalLink url={href}>{children}</InternalExternalLink>;
    },
  };

  return (
    <ReactMarkdown
      allowDangerousHtml
      plugins={[gfm]}
      renderers={renderers}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };
