import axios from 'axios';

interface Event {
  id: number,
  name: string,
  price: string,
  cover: string
  category: {
    id: number,
    name: string
  },
};

type State = () => { events: Array<Event> }

type ActionParameter = (type: string, payload?: string) => Promise<any>

export const state: State = () => ({
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
  async fetchEvents(): Promise<any> {
    try {
      const response = await axios.get('http://laravel.test/api/events', {
        headers: {
          accept: 'application/json'
        }
      });
      
      return response.data;
      
    } catch(error) {
      console.log(error);
    }
  },

  async addEvents({ dispatch, commit }: { dispatch: ActionParameter, commit: ActionParameter }) {
    const events = await dispatch('fetchEvents');

    commit('setEvents', events);
  }
};