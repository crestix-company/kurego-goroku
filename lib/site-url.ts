// These non-secret values are substituted at build time for both server and client.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://kurego-goroku.s-nishita.chatgpt.site';
export function pageUrl(path: string): string {
  const [pathname, hash] = path.split('#', 2);
  const trailing = basePath && !pathname.endsWith('/') ? '/' : '';
  return `${basePath}${pathname}${trailing}${hash ? `#${hash}` : ''}`;
}
export function assetUrl(path: string): string { return `${basePath}${path}`; }
export function canonicalUrl(path: string): string { return new URL(pageUrl(path), siteOrigin).href; }
