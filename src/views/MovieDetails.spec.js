import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import MovieDetailsView from './MovieDetailsView.vue';
import axios from 'axios';

vi.mock('axios');

const mockMovie = {
  id: 1,
  name: 'Movie 1',
  genres: ['Action'],
  summary: 'Summary 1',
  image: { medium: '', original: '' },
};
const mockEpisodes = [
  { id: 1, name: 'Ep1', season: 1, number: 1, image: { medium: '' } },
  { id: 2, name: 'Ep2', season: 1, number: 2, image: { medium: '' } },
];

describe('MovieDetailsView', () => {
  beforeEach(() => {
    axios.get
      .mockResolvedValueOnce({ data: mockMovie })
      .mockResolvedValueOnce({ data: mockEpisodes });
  });

  it('renders movie and episodes after fetch', async () => {
    const wrapper = mount(MovieDetailsView, {
      global: {
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
    });
    await flushPromises();
    expect(wrapper.text()).toContain('Movie 1');
    expect(wrapper.text()).toContain('Ep1');
    expect(wrapper.text()).toContain('Ep2');
  });
});
