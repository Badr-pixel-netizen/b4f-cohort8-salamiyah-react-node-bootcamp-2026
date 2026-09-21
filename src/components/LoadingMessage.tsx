interface LoadingMessageProps {
  label: string;
}

function LoadingMessage({ label }: LoadingMessageProps) {
  return <p className="message">{label}</p>;
}

export default LoadingMessage;
