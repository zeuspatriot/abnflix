import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import MovieDetailsView from './MovieDetailsView.vue';
import axios from 'axios';

vi.mock('axios');
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 1 },
  }),
}));

const mockMovie = {
  id: 1,
  name: 'Movie 1',
  premiered: '2014-12-12',
  genres: ['Action'],
  summary: 'Summary 1',
  image: { medium: '', original: '' },
};
const mockEpisodes = [
  { id: 1, name: 'Season_1_Ep1', season: 1, number: 1, image: { medium: '' } },
  { id: 2, name: 'Season_1_Ep2', season: 1, number: 2, image: { medium: '' } },

  { id: 3, name: 'Season_2_Ep1', season: 2, number: 1, image: { medium: '' } },
  { id: 4, name: 'Season_2_Ep2', season: 2, number: 2, image: { medium: '' } },
];

describe('MovieDetailsView', () => {
  beforeEach(() => {
    axios.get
      .mockResolvedValueOnce({ data: mockMovie })
      .mockResolvedValueOnce({ data: mockEpisodes });
  });

  it('renders movie and episodes after fetch', async () => {
    const spy = vi.spyOn(axios, 'get');
    const wrapper = mount(MovieDetailsView, {
      global: {
        directives: {
          horizontalScroll: () => {},
        },
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
    });
    await flushPromises();
    expect(spy).toBeCalledWith('https://api.tvmaze.com/shows/1');
    expect(spy).toBeCalledWith('https://api.tvmaze.com/shows/1/episodes');

    expect(wrapper.text()).toContain('Movie 1');
    expect(wrapper.text()).toContain('Season_1_Ep1');
    expect(wrapper.text()).toContain('Season_1_Ep2');
  });

  it('renders appropriate episodes after changing seasons', async () => {
    const spy = vi.spyOn(axios, 'get');
    const wrapper = mount(MovieDetailsView, {
      global: {
        directives: {
          horizontalScroll: () => {},
        },
        mocks: {
          $route: { params: { id: 1 } },
        },
      },
    });
    await flushPromises();
    expect(spy).toBeCalledWith('https://api.tvmaze.com/shows/1');
    expect(spy).toBeCalledWith('https://api.tvmaze.com/shows/1/episodes');

    await wrapper.find('[data-testid=seasonSelect]').setValue(2);

    expect(wrapper.text()).toContain('Season_2_Ep1');
    expect(wrapper.text()).toContain('Season_2_Ep2');
  });
});
