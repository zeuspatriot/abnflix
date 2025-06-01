import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NavBar from './NavBar.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('NavBar', () => {
  it('renders ABN-Flix title', () => {
    const wrapper = mount(NavBar, {
      global: { plugins: [router] },
    });
    expect(wrapper.text()).toContain('ABN-Flix');
  });

  it('renders search input', () => {
    const wrapper = mount(NavBar, {
      global: { plugins: [router] },
    });
    expect(wrapper.find('input#searchBar').exists()).toBe(true);
  });
});
