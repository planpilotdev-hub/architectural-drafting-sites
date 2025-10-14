export function absoluteBaseUrl() {
  const v = process.env.NEXT_PUBLIC_BASE_URL || '';
  return v.replace(/\/$/, '');
}

