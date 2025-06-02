import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import NavBar from './NavBar.vue';
import router from '../router';

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

  it('should route to search page after the user types show name in searchBar', async () => {
    const spy = vi.spyOn(router, 'push');
    vi.useFakeTimers();
    const wrapper = mount(NavBar, {
      global: { plugins: [router] },
    });
    await flushPromises();
    await wrapper.find('input#searchBar').setValue('SEAL');
    await wrapper.find('input#searchBar').trigger('keyup');
    await vi.advanceTimersByTime(600);

    expect(spy).toBeCalledWith('/search/SEAL');
  });

  it('empty Input after triming should lead to home page', async () => {
    const spy = vi.spyOn(router, 'push');
    vi.useFakeTimers();
    const wrapper = mount(NavBar, {
      global: { plugins: [router] },
    });
    await flushPromises();
    await wrapper.find('input#searchBar').setValue('   ');
    await wrapper.find('input#searchBar').trigger('keyup');
    await vi.advanceTimersByTime(600);

    expect(spy).toBeCalledWith('/');
  });

  it('after routing to search input should not be cleared', async () => {
    const spy = vi.spyOn(router, 'push');
    vi.useFakeTimers();
    const wrapper = mount(NavBar, {
      global: { plugins: [router] },
    });
    await flushPromises();
    await wrapper.find('input#searchBar').setValue('SEAL');
    await wrapper.find('input#searchBar').trigger('keyup');
    await vi.advanceTimersByTime(600);

    expect(spy).toBeCalledWith('/search/SEAL');
    expect(wrapper.find('input#searchBar').element.value).toContain('SEAL');
  });

  it('after routing to any other page input should be cleared', async () => {
    const spy = vi.spyOn(router, 'push');
    vi.useFakeTimers();
    const wrapper = mount(NavBar, {
      global: { plugins: [router] },
    });
    await flushPromises();
    await wrapper.find('input#searchBar').setValue('SEAL');
    await wrapper.find('input#searchBar').trigger('keyup');
    await vi.advanceTimersByTime(600);

    expect(spy).toBeCalledWith('/search/SEAL');
    expect(wrapper.find('input#searchBar').element.value).toContain('SEAL');

    await wrapper.find('a[href="/"]').trigger('click');
    await flushPromises();
    expect(spy).toBeCalledWith('/');
    expect(wrapper.find('input#searchBar').element.value).toBe('');
  });
});
