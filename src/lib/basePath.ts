// Prefix for all static assets when deployed to GitHub Pages
// In dev: '' (no prefix). In production: '/iron-oak-podcast'
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/iron-oak-podcast' : '';

export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
