import { css } from "@emotion/react";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export default function Card({
  children,
  hoverable = false,
  ...rest
}: CardProps) {
  return (
    <div css={[cardStyle, hoverable && hoverableStyle]} {...rest}>
      {children}
    </div>
  );
}

Card.Body = function CardBody({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div css={bodyStyle} {...rest}>
      {children}
    </div>
  );
};

Card.Image = function CardImage({
  src,
  alt,
  height = "200px",
  ...rest
}: {
  src: string;
  alt: string;
  height?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div css={[imageWrapperStyle, css({ height })]} {...rest}>
      <img src={src} alt={alt} css={imageStyle} />
    </div>
  );
};

Card.Footer = function CardFooter({
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div css={footerStyle} {...rest}>
      {children}
    </div>
  );
};

const cardStyle = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
  border: "1.5px solid #e5e7eb",
  borderRadius: "14px",
  overflow: "hidden",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
});

const hoverableStyle = css({
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 8px 28px rgba(0, 0, 0, 0.10)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
});

const bodyStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  padding: "1rem",
  flexGrow: 1,
});

const imageWrapperStyle = css({
  width: "100%",
  overflow: "hidden",
  flexShrink: 0,
});

const imageStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
});

const footerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.75rem 1rem",
  borderTop: "1px solid #f3f4f6",
});
