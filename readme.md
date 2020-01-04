## React-Redux Project Setup

This project is a straight forward setup for a React project. Using the recommended practices and Flux pattern. Aside from the required libraries, additional libraries have been added as well which are crucial to a React project and makes life easier, below is the breakdown of required libraries and additional ones along with one liner to describe their use, along a small cheat sheet.

This project also make use of libraries like eslint to enforce valid code etc, along with `Husky` to stop faulty code from being committed unless it is cleared by eslint.

Moreover, along with above description, a basic Protected/Public route mechanism for `users` and `guest` have also been added to work with react router and redux state.

> Note: When you run `npm install` , make sure you are in a git repository for husky to successfully setup hooks, else uninstall then reinstall husky after you have initialized project with `git init`.

## Libraries

-   **Webpack** - As a static module bundler
-   **Redux** - For state management
-   **Saga** - For side effects (async stuff)
-   **React Router** - For declarative purpose
-   **Redux Persist** - To rehydrate/persist state (e.g. on page refresh)
-   **Reselect** - A selector library for Redux
-   **Axios** - A HTTP client for async Promise based requests
-   **Ramda** - Lots of utility functions to make life easier

## Libraries for UI

-   **Bootstrap** - UI Framework/library
-   **CSS Loader** - To load CSS files
-   **SASS Loader** - To load SASS files
-   **URL Loader** - To load Jpeg/png/jpg files etc.

## Libraries for Linting and Enforcing Practices

-   **eslint** - to enforce practices and valid code etc
-   **husky** - to listen to git hooks e.g. `git commit`
-   **lint-staged** - to lint only those file present in git's staging area

## Library for Unit tests

-   **Jest**

## Cheat Sheet

-   To start development server : `npm run server`
-   To start storybook server : `npm run storybook`
-   To make a distribution build : `npm run build`
-   To run prettier manually : `npm run pretty`
-   To run eslint manually, followed be prettier : `npm run fix`
-   To run Jest tests manually : `npm run test`

## Libraries References:

Following are the references to libraries being used in this project

[Webpack](https://webpack.js.org/concepts/)
[Redux](https://redux.js.org/)
[Saga](https://redux-saga.js.org/)
[React Router](https://reacttraining.com/react-router/web/guides/quick-start)
[Redux Persist](https://github.com/rt2zz/redux-persist)
[Rselect](https://github.com/reduxjs/reselect)
[Axios](https://github.com/axios/axios)
[Ramda](https://ramdajs.com/)
[Eslint](https://eslint.org/docs/user-guide/getting-started)
[Husky](https://github.com/typicode/husky)
[Jest](https://jestjs.io/)
[Lint Staged](https://github.com/okonet/lint-staged)
