#! /usr/bin/env node
// I'm using json import assertions, so we're silencing the warning. Should be fine, right?
import 'suppress-experimental-warnings';

const { update, runLatest } = await import('./update.js');
const { start } = await import('./index.js');
if (process.argv.includes('--start')) {
  console.log('Starting...');
  await start();
} else {
  // update it
  console.log('Updating...');
  await runLatest();
}
// await import('./index.js');
