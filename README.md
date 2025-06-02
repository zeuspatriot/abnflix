# abnflix

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Tools and strategy

-- create vue for boilerplate
-- Tailwind for quick styling
-- vitest for testing
-- axios for http communication
-- vue-material-design-icons
-- lodash/debounce

Trying to avoid using too many external libraries and plugins, some solutions were self-implemented. `horizontalScroll` directive is one of the examples, mainly to showcase custom directives usage. Is it the best carusel implementation? No! Is it get the job done? To an extent. Small issue with scroll capturing on desktop devices (could be mitigated with turning event passive, and implementing toast message to hold down shift while scrolling).

Some details are omited on MovieDescription component, mainly to save time. Additional show details could be added there, like director name and photo, cast and charachters, etc. But as it is not higlighting any new ideas or skills, and due to time constraint, I made a decision to ommit it from initial implementation.

Testing is limited to `Component` testing instead of `Unit` and `End-to-End` testing. Component tests provide the best result compared to time spent. It immitates user behaviour to some extent, and test "visual" outcome of user actions. Basicly we try to test what happens on the screen, and not in the code.

HomeView displays rating overlay on top of each show to illustrate sorting by rating and not the design decision :)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
