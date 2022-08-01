import { createStore, action } from 'easy-peasy';

const store = createStore({
  book: {
    user: 'BENJAMIN',
    usernameField: '',
    emailField: '',
    passwordField: '',
    searchField: '',
    favBooks: [],
    updateUsernameField: action((state, payload) => {
      usernameField = payload;
    }),
    updateEmailField: action((state, payload) => {
      state.book.emailField = payload;
    }),
    updatePasswordField: action((state, payload) => {
      passwordField = payload;
    }),
    updateSearchField: action((state, payload) => {
      searchField = payload;
    }),

  },
  devTools: true
}
);


export default store;