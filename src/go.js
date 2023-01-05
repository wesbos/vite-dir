#! /usr/bin/env node
import { start } from './start.js';
import { checkIfUpdateIsNeeded } from './update.js';

// when npx vite-dir` is run, we check if we need to update it since npm has has a bug that is not fixed as of npm 9.2.0.
if (process.argv.includes('--start')) {
  await start();
} else {
  // This function will either update the package, or run it, both with the --start flag, which will then run this file again, and then run the start function
  await checkIfUpdateIsNeeded();
}
