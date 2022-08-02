import { createStore, action } from 'easy-peasy';

const store = createStore({
  user: {
    likedBooks: []
  },
  updateUser: action((state, payload) => {
    state.user = payload;
  }),
  logout: action((state, payload) => {
    state.user = {
      likedBooks:[]
    };
  }),
  userLikedBooks: [],
  updateLikedBooks: action((state, payload) => {
    console.log('payload: ',payload);
    state.user.likedBooks = payload;
  })
}, // model
  { devTools: true } //config
);


export default store;