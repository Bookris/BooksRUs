import { createStore, action } from 'easy-peasy';

const store = createStore({
  user: {},
  updateUser: action((state, payload) => {
    state.user = payload;
  })
}, // model
  { devTools: true } //config
);


export default store;