import { css } from "@emotion/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main css={layoutStyle}>{children}</main>;
}

const layoutStyle = css`
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  padding: 4rem 1.5rem 5rem;
`;
