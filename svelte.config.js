import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [mdsvex({ extensions: ['.svx'] })],
  kit: {
    adapter: adapter({ pages: 'site', assets: 'site', strict: false }),
    alias: { '#lib': 'src/lib' },
    prerender: {
      entries: ['/kb', '/kb/incidents/4471-causes', '/kb/incidents/4471', '/kb/triage/dedupe', '/kb/decisions/0001-dedupe-by-subject'], handleHttpError: 'warn', handleEntryGeneratorMismatch: 'warn', handleMissingId: 'warn', handleUnseenRoutes: 'ignore' }
  }
};

export default config;
