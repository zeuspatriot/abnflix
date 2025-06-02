import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeView from './HomeView.vue';
import axios from 'axios';
import { nextTick } from 'vue';
import router from '../router';

vi.mock('axios');

const mockMovies = [
  {
    id: 1,
    name: 'Movie 1',
    genres: ['Action'],
    summary: 'Summary 1',
    image: { medium: 'Movie_1_medium', original: 'Movie_1_original' },
  },
  {
    id: 2,
    name: 'Movie 2',
    genres: ['Drama'],
    summary: 'Summary 2',
    image: { medium: 'Movie_2_medium', original: 'Movie_2_original' },
  },
];

describe('HomeView', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockMovies });
  });

  it('renders genres and movies after fetch', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        directives: {
          horizontalScroll: () => {},
        },
      },
    });
    await flushPromises();

    expect(wrapper.findAll('[data-testid="genre"]').length).toBe(2);
    expect(wrapper.findAll('[data-testid="genre"]').map((el) => el.text())).toEqual(
      mockMovies.map((movie) => movie.genres[0]),
    );
  });

  it('updates selectedMovie when a show is hovered over', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        directives: {
          horizontalScroll: () => {},
        },
      },
    });
    await flushPromises();

    const showElements = wrapper.findAll('[data-testid~=movie]');
    expect(showElements.length).toBe(2);

    await showElements[1].trigger('mouseenter');

    expect(showElements[1].html()).toContain('data-testid="movie selected"');
  });
});
