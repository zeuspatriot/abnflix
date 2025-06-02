import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieDescription from './MovieDescription.vue';

const show = {
  id: 1,
  name: 'Test Movie',
  premiered: '2020-01-01',
  genres: ['Drama'],
  summary: '<p>Test summary</p>',
  image: { original: 'test.jpg', medium: 'test.jpg' },
};

describe('MovieDescription', () => {
  it('renders movie name and summary', () => {
    const wrapper = mount(MovieDescription, {
      props: { show },
    });
    expect(wrapper.text()).toContain('Test Movie');
    expect(wrapper.html()).toContain('Test summary');
  });

  it('renders genres', () => {
    const wrapper = mount(MovieDescription, {
      props: { show },
    });
    expect(wrapper.text()).toContain('Drama');
  });

  it('renders image if present', () => {
    const wrapper = mount(MovieDescription, {
      props: { show },
    });
    expect(wrapper.find('img').attributes('src')).toBe('test.jpg');
  });
});
