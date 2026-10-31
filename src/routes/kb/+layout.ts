const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true }) as Record<string, any>;

export const prerender = true;

export function load({ url }: { url: URL }) {
  const path = url.pathname.replace(/\/$/, '') || '/kb';
  const key = '/src/routes' + path + '/+page.svx';
  return { metadata: pages[key]?.metadata ?? {} };
}
