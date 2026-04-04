import { css } from "@emotion/react";
import { Button, Card } from "@/components";
import type { Product } from "@/types/product";
import { formatKoreanCurrency } from "@/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card css={productCardStyle}>
      <Card.Image src={product.imageUrl} alt={product.name} />
      <Card.Body>
        <div css={productNameStyle}>{product.name}</div>
        <div>{product.category}</div>
        <div>⭐ {product.rating}</div>
        <div>{formatKoreanCurrency(product.price)}</div>
      </Card.Body>
      <Card.Footer css={productCardFooterStyle}>
        <Button variant="secondary" size="sm">
          장바구니 담기
        </Button>
        <Button variant="primary" size="sm">
          바로 구매
        </Button>
      </Card.Footer>
    </Card>
  );
}

const productCardStyle = css`
  max-width: 300px;
  width: 100%;
`;

const productNameStyle = css`
  line-height: 1.4;
  min-height: calc(1.4em * 2);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const productCardFooterStyle = css`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
