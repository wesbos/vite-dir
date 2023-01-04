#! /usr/bin/env node
import { defineConfig, createServer, preview, resolveConfig, mergeConfig } from "vite";
import { directoryPlugin } from "vite-plugin-list-directory-contents";


function parseServerFlags() {
  // Find the flag indexes
  const flagIndexes = process.argv.filter(arg => arg.startsWith('--'));
  const flags = flagIndexes.map((arg) => {
    const index = process.argv.indexOf(arg);
    const flag = process.argv.at(index).replace('--', '');
    const value = process.argv.at(index + 1);
    return [flag, value].map(numberify).map(booleanify);
  });

  return Object.fromEntries(flags);
}

const server = parseServerFlags();
console.log(server);

// check for root
const maybeRoot = process.argv[2];
const root = maybeRoot.startsWith('--') ? process.cwd() : maybeRoot;

const myConfig = defineConfig({
  command: 'serve',
  plugins: [directoryPlugin({ baseDir: root })],
  server: {
    ...server,
  }
})


function numberify(val) {
  const n = Number(val);
  return isNaN(n) ? val : n;
}

function booleanify(val) {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}

async function start() {
  const server = await createServer(myConfig)
  await server.listen()
  server.printUrls()
}


start();
