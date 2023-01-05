import { readFile } from 'node:fs/promises';

const fileUrl = new URL('./package.json', import.meta.url);
export default JSON.parse(await readFile(fileUrl, 'utf8'));
