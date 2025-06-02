import './assets/main.css';

import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.directive('horizontalScroll', {
  mounted(el: HTMLElement) {
    let touchPrev: number;

    el.addEventListener(
      'touchmove',
      (event: TouchEvent) => {
        event.preventDefault();
        const currentTouch = event.changedTouches[0].clientX;
        if (!touchPrev) {
          touchPrev = currentTouch;
        }
        if (touchPrev > currentTouch) {
          el.scrollLeft = el.scrollLeft + 500;
          touchPrev = currentTouch;
        } else {
          el.scrollLeft = el.scrollLeft - 500;
          touchPrev = currentTouch;
        }
      },
      { passive: true },
    );
    el.addEventListener('touchend', (event: TouchEvent) => {
      touchPrev = 0;
    });

    el.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY === -100) {
        el.scrollLeft = el.scrollLeft - 750;
      } else if (event.deltaY === 100) {
        el.scrollLeft = el.scrollLeft + 750;
      }
    });
  },
});

app.mount('#app');
