import { fileURLToPath } from 'node:url';
const config = { output: 'export', images: { unoptimized: true }, trailingSlash: true, turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) }, devIndicators: false };
export default config;
