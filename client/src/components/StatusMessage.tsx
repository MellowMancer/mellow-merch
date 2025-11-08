interface StatusMessageProps {
  status: 'loading' | 'error';
  message?: string;
}

export function StatusMessage({ status, message }: StatusMessageProps) {
  if (status === 'loading') {
    return <p className="text-sm font-medium text-primary animate-pulse">Loading…</p>;
  }

  return (
    <p className="text-sm font-medium text-danger">
      {message ?? 'Something went wrong.'}
    </p>
  );
}

