# 📝 Exam 1: 다중 필터 상품 목록

## 📋 문제 설명

이커머스 서비스의 **상품 목록 페이지**를 구현해주세요.

사용자가 다양한 조건으로 상품을 필터링하고, 정렬하고, 검색할 수 있어야 합니다.

## 🛠 기술 조건

- **TypeScript** 필수
- **React** 사용
- 스타일링 자유 (CSS Modules, Tailwind, styled-components, 순수 CSS 등 — 디자인 평가 아님)
- 추가 라이브러리 사용 자유 (단, 선택한 이유를 PR에 명시)

## 📡 API

보일러플레이트에 MSW(Mock Service Worker) 기반 Mock API가 포함되어 있습니다.

`pnpm dev` 실행 시 자동으로 활성화됩니다.

### `GET /api/products`

전체 상품 목록을 반환합니다. 쿼리 파라미터로 서버 사이드 필터링이 가능합니다.

| 파라미터 | 타입 | 설명 | 예시 |
|----------|------|------|------|
| `categories` | string | 쉼표로 구분된 카테고리 | `shoes,tops` |
| `minPrice` | number | 최소 가격 | `10000` |
| `maxPrice` | number | 최대 가격 | `50000` |
| `keyword` | string | 상품명 검색어 | `나이키` |
| `sort` | string | 정렬 기준 | `price_asc` \| `price_desc` \| `newest` \| `rating` |

**응답:**

```json
{
  "products": [
    {
      "id": 1,
      "name": "클래식 러닝화",
      "price": 89000,
      "category": "shoes",
      "imageUrl": "https://picsum.photos/seed/1/400/400",
      "createdAt": "2025-02-15T09:00:00Z",
      "rating": 4.5
    }
  ],
  "total": 60
}
```

> **💡 필터링 전략 힌트**
>
> 이 과제에서는 필터링을 **어디서 처리할지** 선택할 수 있습니다. 두 가지 접근법이 있으며, 정답은 없습니다.
>
> **방법 A) 서버 사이드 필터링** — 필터가 바뀔 때마다 쿼리 파라미터를 붙여서 API를 재호출
> ```
> 사용자가 shoes 체크 → fetch('/api/products?categories=shoes') → 필터링된 결과만 받음
> 사용자가 정렬 변경 → fetch('/api/products?categories=shoes&sort=price_asc') → 다시 호출
> ```
> - 필터 변경마다 네트워크 요청 발생 (300~800ms 지연)
> - 데이터가 수만 건일 때 적합 (실무에서 일반적)
> - 로딩/에러 처리가 중요해짐
>
> **방법 B) 클라이언트 사이드 필터링** — 최초 1회 전체 데이터를 받아와서 JS로 필터링
> ```
> 최초 렌더 → fetch('/api/products') → 60개 전부 받아서 메모리에 저장
> 사용자가 shoes 체크 → products.filter(p => p.category === 'shoes') → 즉시 반영
> ```
> - 필터 변경 시 네트워크 요청 없이 즉각 반응 (UX 우수)
> - 데이터가 소량일 때 적합 (이 과제는 60개)
> - 초기 로딩 후에는 오프라인에서도 동작
>
> 보일러플레이트의 MSW 핸들러(`src/mocks/handlers.ts`)에는 쿼리 파라미터 기반 서버 필터링이 이미 구현되어 있어서, **두 방식 모두 바로 사용 가능**합니다. 어느 쪽을 선택했는지, 왜 그렇게 판단했는지를 PR에 명시해주세요.

## ✅ 필수 요구사항

### 상품 목록
- [ ] API에서 상품 데이터를 불러와 카드 형태로 렌더링 (이미지, 상품명, 가격, 카테고리, 평점)

### 필터링
- [ ] **카테고리 필터**: 체크박스 다중 선택 (shoes, tops, bottoms, accessories)
- [ ] **가격 범위 필터**: 최소/최대 가격 입력
- [ ] **키워드 검색**: 상품명 검색 (디바운싱 적용)

### 정렬
- [ ] 가격 낮은순 / 가격 높은순 / 최신순 / 평점순

### URL 동기화
- [ ] 필터/정렬/검색 상태가 URL 쿼리스트링에 반영
- [ ] 새로고침해도 필터 상태 유지
- [ ] URL을 복사해서 공유하면 같은 필터 상태로 열림

### 필터 초기화
- [ ] "전체 초기화" 버튼으로 모든 필터를 기본값으로 리셋

### 상태 처리
- [ ] 로딩 중 표시
- [ ] API 에러 시 사용자 안내 + 재시도 가능
- [ ] 필터 결과가 없을 때 빈 상태 안내

## 🌟 선택 요구사항 (보너스)

- [ ] UI/UX 개선 (사용자가 실제로 이 서비스를 사용했을 때를 고려하여, UI/UX 에 대해 어필할 포인트가 있다면 어필해주세요!)
- [ ] 필터 결과 개수 표시 (예: "32개 상품")
- [ ] 반응형 레이아웃 (모바일 / 데스크톱)
- [ ] 상품 목록 애니메이션 / 트랜지션
- [ ] 페이지네이션 또는 무한 스크롤

## 🖼 UI 참고 (와이어프레임)

- 추후 제공 예정

## 📝 PR 작성 가이드

PR 본문에 아래 항목들을 포함해주세요. 코드만큼이나 **설계 판단의 근거**가 중요합니다.

### 1. 필터링 전략
> 클라이언트 사이드 vs 서버 사이드 필터링 중 어느 쪽을 선택했는지, 왜?
> 각각의 트레이드오프를 어떻게 판단했는지 적어주세요.

### 2. 상태 관리 전략
> 필터 상태를 어디서 관리하나요? (URL 파라미터, useState, 전역 store 등)
> 그렇게 선택한 이유는?

### 3. 컴포넌트 구조
> 어떤 기준으로 컴포넌트를 나눴나요?
> 폴더 구조는 어떻게 잡았고, 왜 그렇게 했나요?

### 4. 디바운싱 위치
> 검색 디바운싱을 어디에(어느 레이어에) 걸었나요?
> 디바운싱 시간은 얼마로 설정했고, 왜?

### 5. 과제를 수행하는데 어려움은 없었나요?
> 어려웠던 부분이 있다면 말씀해주세요~! 추후 과제떄 개선해보겠습니다.

### 6. 추가 라이브러리 (optional)
> 추가로 설치한 라이브러리가 있다면, 각각 왜 선택했는지 설명해주세요.

### 7. 아쉬운 점 / 개선하고 싶은 점 (optional)
> 시간이 더 있었다면 어떤 부분을 개선했을지 자유롭게 적어주세요.

## ⏰ 제한시간

- 약 **5~6시간** (한 번에 할 필요 없음, 평일 저녁 + 주말 활용)
- **제출 마감**: 2주차 모임 전까지 PR 제출

## 🚀 시작하기

```bash
# 본인 폴더로 이동
cd exam-1/{your-github-username}

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 브라우저에서 http://localhost:5173 열기
# 개발자 도구 > Console에서 "[MSW] Mocking enabled." 확인
# fetch('/api/products').then(r => r.json()).then(console.log) 으로 API 테스트
```

## 📚 참고 자료 (선택)

아래는 과제와 관련된 참고 자료입니다. 반드시 읽을 필요는 없지만 도움이 될 수 있습니다.

- [React 공식 문서 - Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [MSW 공식 문서](https://mswjs.io/docs)
- [TkDodo - Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [Kent C. Dodds - Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
