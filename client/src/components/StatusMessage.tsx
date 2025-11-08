interface StatusMessageProps {
  status: 'loading' | 'error';
  message?: string;
}

export function StatusMessage({ status, message }: StatusMessageProps) {
  if (status === 'loading') {
    return <p className="status status--loading">Loading…</p>;
  }

  return <p className="status status--error">{message ?? 'Something went wrong.'}</p>;
}

