#! /usr/bin/env node
// I'm using json import assertions, so we're silencing the warning. Should be fine, right?
import 'suppress-experimental-warnings';

const { update } = await import('./update.js');
const { start } = await import('./index.js');
await update();
await start();

// await import('./index.js');
