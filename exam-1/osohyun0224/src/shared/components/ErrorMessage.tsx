interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p className="error-icon">⚠️</p>
      <p className="error-text">{message}</p>
      <button type="button" className="retry-button" onClick={onRetry}>
        다시 시도
      </button>
    </div>
  );
}
