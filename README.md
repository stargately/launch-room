# launch-room

[![CircleCI](https://circleci.com/gh/puncsky/web-onefx-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/puncsky/web-onefx-boilerplate/tree/master)

## User guide

Launch Room is a feature flag service that is lightweight and compatible with LaunchDarkly client.

[User guide](https://stargately.com/docs/launch-room): How to integrate your service with launch-room?

![](https://tp-misc.b-cdn.net/launch-room-01.png)
![](https://tp-misc.b-cdn.net/launch-room-02.png)

## Development

All the descriptions below are for the development of launch-room itself.

- [Documentation](https://onefx.js.org/doc.html?utm_source=github-iotex-explorer)
- [Contributing](https://onefx.js.org/contributing.html?utm_source=github-iotex-explorer)

### Create a project

```bash
git clone git@github.com:puncsky/launch-room.git
```

### Run your project

This is intended for \*nix users. If you use Windows, go to [Run on Windows](#run-on-windows). Let's first prepare the environment.

```bash
cd launch-room

nvm use 10.23.0
npm install

# prepare environment variable
cp ./.env.tmpl ./.env
```

#### Development mode

To run your project in development mode, run:

```bash
npm run watch
```

The development site will be available at [http://localhost:4105](http://localhost:4105).

#### Production Mode

It's sometimes useful to run a project in production mode, for example, to check bundle size or to debug a production-only issue. To run your project in production mode locally, run:

```bash
npm run build-production
NODE_ENV=production npm run start
```

#### NPM scripts

- `npm run test`: test the whole project and generate a test coverage
- `npm run ava ./path/to/test-file.js`: run a specific test file
- `npm run build`: build source code from `src` to `dist`
- `npm run lint`: run the linter
- `npm run kill`: kill the node server occupying the port 4105.
