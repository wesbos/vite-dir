import latestVersion from 'latest-version';
import ora from 'ora';
import { compareVersions } from 'compare-versions';
import chalk from 'chalk';
import { execa } from 'execa';
import pkg from './package.json' assert { type: "json" };
const VERSION = pkg.version;
const packageName = pkg.name;

export const spinner = ora();
const rawProgramArgs = process.argv.slice(2);

export async function update() {
  spinner.start();
  spinner.text = 'Ensuring latest version';
  const latestVer = await latestVersion(packageName);
  const newerVersionAvailable = compareVersions(VERSION, latestVer) === -1;
  if (newerVersionAvailable) {
    console.log(`Current version of [${packageName}] is [${chalk.cyan(
      VERSION
    )}] is lower than the latest available version [${chalk.yellow(
      latestVer
    )}]. Updating ${packageName} with @latest...`);
    await execa(
      'npx',
      [
        `${packageName}@latest`,
        '--no-check-latest',
        '--start',
        ...rawProgramArgs,
      ],
      { env: { npm_config_yes: 'true' } }
    );
    spinner.text = `Updated ${packageName} to [${chalk.green(latestVer)}]`;
    spinner.clear();
  } else {
    // Same version. We are running the latest one!
    console.log(
      `\nAlready on the latest version - [${chalk.yellow(latestVer)}]. Starting`
    );
    // await runCurrent();
      execa('npx', [ `${packageName}`, '--no-check-latest', '--start', ...rawProgramArgs ],
    { env: { npm_config_yes: 'true' } } );

    // spinner.stop();
    // spinner.clear();
  }
}

export async function runCurrent() {
  return execa(
    'npx',
    [
      `${packageName}`,
      '--no-check-latest',
      '--start',
      ...rawProgramArgs,
    ],
    { env: { npm_config_yes: 'true' } }
  ).stdout.pipe(process.stdout);
}
