interface ErrorMessageProps {
  readonly message: string;
  readonly onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn--secondary">
          Retry
        </button>
      )}
    </div>
  );
}
