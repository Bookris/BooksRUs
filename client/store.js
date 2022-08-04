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
    state.isLogged = false;
  }),
  // userLikedBooks: [],
  updateLikedBooks: action((state, payload) => {
    console.log('payload: ', payload);
    state.user.likedBooks = payload;
  }),
  isLogged: false,
  setIsLogged: action((state, payload) => {
    console.log("LOGGED PAYLOAD: ",payload)
    state.isLogged = payload;
    console.log('STATE LOGGED: ',state.isLogged)
  })
}, // model
  { devTools: true } //config
);


export default store;