import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import SearchView from './SearchView.vue';
import axios from 'axios';

vi.mock('axios');
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { query: 'Show' },
  }),
}));
const mockShows = [
  {
    score: 1,
    show: {
      id: 1,
      name: 'Show 1',
      image: { medium: 'img1.jpg' },
    },
  },
  {
    score: 2,
    show: {
      id: 2,
      name: 'Show 2',
      image: null,
    },
  },
];

describe('SearchView.vue', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockShows });
  });

  it('shows and selectedMovie are set after successfull search', async () => {
    const spy = vi.spyOn(axios, 'get');
    const wrapper = mount(SearchView);

    console.log('geting the search value:', wrapper.vm.shows.value);
    expect(spy).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=Show');
    await flushPromises();

    expect(wrapper.findAll('[data-testid~=show]').length).toEqual(2);
    expect(wrapper.find('[data-testid="show selected"] img').html()).toContain('src="img1.jpg"');
  });

  it('updates selectedMovie when a show is hovered over', async () => {
    const wrapper = mount(SearchView);
    await flushPromises();

    const showElements = wrapper.findAll('[data-testid~=show]');
    expect(showElements.length).toBe(2);

    await showElements[1].trigger('mouseenter');

    expect(showElements[1].html()).toContain('data-testid="show selected"');
  });
});
