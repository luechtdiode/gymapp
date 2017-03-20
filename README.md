# GymappBootstrap

[![bitHound Overall Score](https://www.bithound.io/github/luechtdiode/gymapp-bootstrap/badges/score.svg)](https://www.bithound.io/github/luechtdiode/gymapp-bootstrap)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.25.5.
Actually updated to version `1.0.0-rc.2`

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `npm run ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Update to latest dependencies

watch out what `npm outdated` is reporting to the console. 
Then carefully compare with the vesions in package.json, update, reload new deps with `npm cache clean`, `npm install`, `npm prune` and run all tests.
If all tests are passing, freeze the configuration by , `npm shrinkwrap`