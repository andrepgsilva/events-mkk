import { faker } from '@faker-js/faker';

interface Event {
  'id': string,
  'name': string,
  'price': string,
  'cover': string
  'category_name': string,
};

const getFakeEvents = async (howMany: number) => {
  let events = [];

  for (let i = 0; i < howMany; i++) {
    const event: Event = {
      'id': faker.finance.account(),
      'name': faker.name.jobArea() + 'Event',
      'price': faker.finance.amount(5, 90, 2, '€'),
      'cover': faker.image.abstract(500, 500, true),
      'category_name': faker.name.firstName(),
    };

    events.push(event);
  }

  return events;
}

export const state = () => ({
  events: [],
});

export const getters = {
  getEvents(state: any) {
    return state.events;
  },
};

export const mutations = {
  setEvents(state: any, payload: any) {
    state.events = payload;
  },
};

export const actions = {
  async fetchEvents({ state }: { state: any }) {
    return await getFakeEvents(30);
  },

  async addEvents({ dispatch, commit }: { dispatch: any, commit: any }) {
    const events = await dispatch('fetchEvents');

    commit('setEvents', events);
  }
};