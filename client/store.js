import { createStore, action } from 'easy-peasy';

const store = createStore({
  user: {
    likedBooks: []
  },
  updateUser: action((state, payload) => {
    console.log("UPDATE USER PAYLOAD: ", payload)
    state.user = {
      ...state.user,
      ...payload
    }

    console.log( state.user);
  }),
  logout: action((state, payload) => {
    state.user = {
      likedBooks: []
    };
  }),
  // userLikedBooks: [],
  updateLikedBooks: action((state, payload) => {
    console.log('payload: ', payload);
    state.user.likedBooks = payload;
  })
}, // model
  { devTools: true } //config
);


export default store;