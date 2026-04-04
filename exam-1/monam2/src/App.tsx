import { css } from '@emotion/react';

import {
  AsyncBoundary,
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Flex,
  Layout,
  ProductList,
  ProductSkeleton,
  Section,
  Select,
} from '@/components';
import { CATEGORY_OPTIONS, DEFAULT_SORT, SORT_OPTIONS } from '@/constants';
import { useCategory, useRouteParams, useSearch } from '@/hooks';
import { isSortOption } from '@/types';

export default function App() {
  return (
    <Layout>
      <Container>
        <Section>
          <PageHeader title="SIPE 마켓" subtitle="구매할 상품을 골라보세요." />
          <ProductSearchBar />
          <Flex
            align="stretch"
            css={css`
              width: 100%;
            `}
          >
            <ProductCategory />
            <ProductSort />
          </Flex>
          <AsyncBoundary suspenseFallback={<ProductSkeleton />}>
            <ProductList />
          </AsyncBoundary>
        </Section>
      </Container>
    </Layout>
  );
}

function ProductSearchBar() {
  const { resetQuery } = useRouteParams();
  const { keyword, options, onChange, search } = useSearch();

  return (
    <Flex
      direction="row"
      align="start"
      gap={8}
      wrap
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          flex: 1;
          min-width: min(18rem, 100%);
        `}
      >
        <Autocomplete
          value={keyword}
          onChange={onChange}
          onSelect={(option) => search(option.value)}
          options={options}
          aria-label="상품명 검색"
          placeholder="상품명을 입력하세요."
        />
      </div>
      <Button onClick={() => search()}>검색</Button>
      <Button onClick={resetQuery} variant="secondary">
        전체 초기화
      </Button>
    </Flex>
  );
}

function ProductCategory() {
  const { selectedCategories, onChange } = useCategory();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        min-width: 0;

        @media (min-width: 768px) {
          flex-direction: row;
          flex-wrap: wrap;
          min-width: 280px;
        }
      `}
    >
      {CATEGORY_OPTIONS.map(({ value, label }) => (
        <Checkbox
          key={value}
          label={label}
          value={value}
          checked={selectedCategories.includes(value)}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

function ProductSort() {
  const { updateQuery, currentQuery } = useRouteParams();
  const selectedSort = currentQuery.sort ?? DEFAULT_SORT;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (!isSortOption(value)) {
      return;
    }

    updateQuery({
      sort: value,
    });
  };

  return (
    <Select options={SORT_OPTIONS} value={selectedSort} onChange={onChange} />
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;
      `}
    >
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
