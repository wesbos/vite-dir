import latestVersion from 'latest-version';
import ora from 'ora';
import { compareVersions } from 'compare-versions';
import chalk from 'chalk';
import { execa } from 'execa';
import pkg from './package.json' assert { type: "json" };
const VERSION = pkg.version;
const packageName = pkg.name;

export const spinner = ora();

export async function update() {
  spinner.start();
  spinner.text = 'Ensuring latest version';
  const latestVer = await latestVersion(packageName);
  if (compareVersions(VERSION, latestVer) === -1 || true) {
    spinner.text = (
      `Current version of [${packageName}] is [${chalk.cyan(
        VERSION
      )}] is lower than the latest available version [${chalk.yellow(
        latestVer
      )}]. Updating ${packageName} with @latest...`
    );
    const rawProgramArgs = process.argv.slice(2);
    await execa(
      'npx',
      [`${packageName}@latest`, '--no-check-latest', '--silent', ...rawProgramArgs],
      {
        env: {
          npm_config_yes: 'true', // https://github.com/npm/cli/issues/2226#issuecomment-732475247
        },
      }
    );
    spinner.text = `Updated ${packageName} to [${chalk.green(latestVer)}]`;
    spinner.clear();
  } else {
    // Same version. We are running the latest one!
    spinner.stop();
    // spinner.clear();
  }
}
