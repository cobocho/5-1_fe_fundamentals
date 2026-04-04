import { css, keyframes } from '@emotion/react';
import { Card } from '@/components';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const SKELETON_CARD_KEYS = Array.from(
  { length: 8 },
  (_, index) => `product-skeleton-${index}`,
);

export default function ProductSkeleton() {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}
    >
      {SKELETON_CARD_KEYS.map((key) => (
        <Card key={key} css={skeletonCardStyle}>
          {/* 썸네일 스켈레톤 */}
          <div css={skeletonImageStyle} />

          {/* 내용 스켈레톤 */}
          <Card.Body css={skeletonBodyStyle}>
            <div css={skeletonTextStyle(80)} />
            <div css={skeletonTextStyle(40)} />
            <div css={skeletonTextStyle(30)} />
            <div css={skeletonTextStyle(60)} />
          </Card.Body>

          {/* 푸터 버튼 스켈레톤 */}
          <Card.Footer css={skeletonFooterStyle}>
            <div css={skeletonButtonStyle} />
            <div css={skeletonButtonStyle} />
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}

const skeletonCardStyle = css`
  max-width: 300px;
  width: 100%;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const skeletonImageStyle = css`
  width: 100%;
  aspect-ratio: 1; /* ProductCard 썸네일과 비슷하게 1:1 비율을 줌 */
  background-color: #e5e7eb; /* 연한 회색 */
`;

const skeletonBodyStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const skeletonTextStyle = (widthPercent: number) => css`
  height: 1rem;
  width: ${widthPercent}%;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

const skeletonFooterStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const skeletonButtonStyle = css`
  width: 80px;
  height: 32px;
  background-color: #e5e7eb;
  border-radius: 6px;
`;
