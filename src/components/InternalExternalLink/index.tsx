import { Link } from "gatsby";
import React from "react";

interface InternalExternalLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  url: string;
}

const InternalExternalLink: React.FC<InternalExternalLinkProps> = ({
  url,
  children,
  ...props
}) => {
  if (url.startsWith("http") || url.startsWith("mailto")) {
    return (
      <a href={url} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={url} {...props}>
      {children}
    </Link>
  );
};

export { InternalExternalLink };
