import latestVersion from 'latest-version';
import { compareVersions } from 'compare-versions';
import chalk from 'chalk';
import { execa } from 'execa';
import pkg from '../package.js';
import { log } from './log.js';

const VERSION = pkg.version;
const packageName = pkg.name;
const rawProgramArgs = process.argv.slice(2);

// Execa promise never resolves with an npx script, so we make our own with stdout. Kinda nice because we both want to await it being done, and also want to pipe the output to the console
async function execaFixed(name) {
  return new Promise((resolve, reject) => {
    const child = execa('npx', [name, '--start', ...rawProgramArgs], {
      env: { npm_config_yes: 'true', FORCE_COLOR: '1' },
    });
    child.stdout.pipe(process.stdout);
    child.on('exit', (code) => {
      code === 0 ? resolve() : reject();
    });
  });
}

export async function checkIfUpdateIsNeeded() {
  const latestVer = await latestVersion(packageName);
  const newerVersionAvailable = compareVersions(VERSION, latestVer) === -1;
  if (newerVersionAvailable) {
    log(
      `Current version of [${packageName}] is [${chalk.cyan(
        VERSION
      )}] is lower than the latest available version [${chalk.yellow(
        latestVer
      )}]. Updating ${packageName} with @latest...`
    );
    await execaFixed(`${packageName}@latest`);

    log(`Updated ${chalk.green(packageName)} to [${chalk.green(latestVer)}]`);
  } else {
    // Same version. We are running the latest one!
    log(`Already on the latest version - [${chalk.yellow(latestVer)}]`);

    await execaFixed(`${packageName}`);
  }
}
