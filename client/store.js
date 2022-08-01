import { createStore, action } from 'easy-peasy';

const store = createStore({
  user: {},
  updateUser: action((state, payload) => {
    state.user = payload;
  }),
  logout: action((state, payload) => {
    state.user = {};
  }),
  userLikedBooks: [],
  updateLikedBooks: action((state, payload) => {
    state.userLikedBooks = payload;
  })
}, // model
  { devTools: true } //config
);


export default store;