import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import HomeView from './HomeView.vue';
import axios from 'axios';

vi.mock('axios');

const mockMovies = [
  {
    id: 1,
    name: 'Movie 1',
    genres: ['Action'],
    summary: 'Summary 1',
    image: { medium: '', original: '' },
  },
  {
    id: 2,
    name: 'Movie 2',
    genres: ['Drama'],
    summary: 'Summary 2',
    image: { medium: '', original: '' },
  },
];

describe('HomeView', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockMovies });
  });

  it('renders genres and movies after fetch', async () => {
    const wrapper = mount(HomeView);
    await flushPromises();
    expect(wrapper.text()).toContain('Action');
    expect(wrapper.text()).toContain('Drama');
    expect(wrapper.text()).toContain('Movie 1');
    expect(wrapper.text()).toContain('Movie 2');
  });
});
