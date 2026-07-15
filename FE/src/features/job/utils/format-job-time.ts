function getDiffMs(date: string | Date): number {
  return Date.now() - new Date(date).getTime();
}

export function formatJobDaysOpen(openedAt: string | Date): string {
  const diffDays = Math.floor(getDiffMs(openedAt) / (1000 * 60 * 60 * 24));
  return `${Math.max(diffDays, 0)}d`;
}

export function formatJobExpiresIn(expiresAt: string | Date | null): string | null {
  if (!expiresAt) return null;

  const diffMs = new Date(expiresAt).getTime() - Date.now();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return '0';

  return String(diffDays);
}

export function formatJobUpdatedAt(updatedAt: string | Date): string {
  const diffMs = getDiffMs(updatedAt);
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Date(updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
