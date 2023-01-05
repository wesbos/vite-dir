export function log(...allOfIt) {
  if (process.env.DEBUG || process.argv.includes('--debug')) {
    console.log(...allOfIt);
  }
}
