interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="message error">
      <p>{message}</p>
      <button className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;
