#! /usr/bin/env node
import { execa } from 'execa';
import 'suppress-experimental-warnings';

// When npx vite-dir is run, we check for a new version, which then will call npx vite-dir again with the --start flag

const { update } = await import('./update.js');
// await update();
const { start } = await import('./index.js');
start();
if (process.argv.includes('--start')) {
  console.log('Starting...');
  await start();
} else {
  // update it
  console.log('Updating...');
  // await update();
  await execa(
    'npx',
    [`vite-dir@latest`, '--start', ...process.argv.splice(2)],
    {
      env: { npm_config_yes: 'true' },
    }
  );
}
