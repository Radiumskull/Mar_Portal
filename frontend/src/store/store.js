import { fetchLocalUser } from "../utils/authUtils";
import { createStore } from "redux";
const initState = {
  user: null,
};

const initUser = () => {
  const user = fetchLocalUser();
  if (user) {
    return { user: user };
  } else {
    return { user: null };
  }
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "USER.INIT":
      return initUser();
    default:
      return state;
  }
};

const initStore = () => {
  const store = createStore(reducer);
  return store;
};

export default initStore;
