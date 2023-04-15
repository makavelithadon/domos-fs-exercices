interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  const classNames = ['text-red-600', 'text-left'];

  if (className) {
    classNames.push(className);
  }

  return <p className={classNames.join(' ')}>{message}</p>;
};

export { ErrorMessage };
