import { defineConfig, createServer } from 'vite';
import { directoryPlugin } from 'vite-plugin-list-directory-contents';
import argv from 'cli-argparse';
import pkg from '../package.js';
import { log } from './log.js';

const args = argv(process.argv);
const maybeRoot = process.argv?.[2] || '';
const root =
  maybeRoot.startsWith('--') || !maybeRoot ? process.cwd() : maybeRoot;

const myConfig = defineConfig({
  command: 'serve',
  root,
  plugins: [directoryPlugin({ baseDir: root })],
  server: {
    ...args.options,
    ...args.flags,
  },
});

export async function start() {
  // Silent mode for updating, it doesnt run
  if (args.flags.silent) {
    log(`Silent Mode. Exiting...`);
    process.exit(0);
  }

  log(`[${pkg.name}] ${pkg.version}`);

  if (args.flags.version) {
    process.exit(0);
  }

  log(`[DEBUG] [${pkg.name}] v${pkg.version}`);
  log(`[DEBUG] root: ${root}`);
  log(`[DEBUG] args.options: ${JSON.stringify(args.options)}`);
  log(`[DEBUG] args.flags: ${JSON.stringify(args.flags)}`);

  log('Starting Vite Server...');
  const server = await createServer(myConfig);
  await server.listen();
  server.printUrls();
}
