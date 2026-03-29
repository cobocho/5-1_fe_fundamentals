interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = '불러오는 중...',
}: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}
