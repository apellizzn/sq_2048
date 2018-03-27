import { createStore, applyMiddleware } from "redux";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import reducers from "./reducers";

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

export default function configStore() {
  return createStore(reducers, applyMiddleware(navMiddleware));
}
