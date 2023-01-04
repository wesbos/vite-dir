#! /usr/bin/env node
// I'm using json import assertions, so we're silencing the warning. Should be fine, right?
import 'suppress-experimental-warnings';

await import('./index.js');
