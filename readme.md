## Vite Dir

A shortcut command that runs `vite` dev server with[vite-plugin-list-directory-contents](https://www.npmjs.com/vite-plugin-list-directory-contents) so you get a live reloaded directory of files.

## But, Why?

I made this for my tutorials, where we create lots of little projects. Running this on a directory of projects will process any `.html` file as it's own project. This gives you a nice UI where you can click through your projects.

Live reloading, typescript loading, CSS Parsing, all the good stuff vite gives you.

## Usage

Without installing anything:

```bash
npx vite-dir
```

Or globally installed:

```bash
npm i -g vite-dir
vite-dir
```

You can also specify a directory:

```bash
vite-dir app/
```

## Configs

Just like vite, no config is needed, but if you have a local `vite.config.js` file, it will use that and add the directory plugin.

## Flags

All flags get passed to [vite's server config](https://vitejs.dev/config/server-options.html).

example:

```bash
vite-dir --port 6969 --host --https true
```

Flags that specify things outside the server don't work. Pass them in a custom config, or just setup a project with [vite-plugin-list-directory-contents](https://www.npmjs.com/vite-plugin-list-directory-contents) instead.
