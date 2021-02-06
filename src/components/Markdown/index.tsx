import React, { useMemo } from "react";
import marked from "marked";

interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children, ...props }) => {
  const text = useMemo(() => {
    return marked(children, {
      gfm: true,
    });
  }, [children]);

  return <div dangerouslySetInnerHTML={{ __html: text }} {...props} />;
};

export { Markdown };
