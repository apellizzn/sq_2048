import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import reducers from "./reducers";
import mySaga from "./sagas";

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
const sagaMiddleware = createSagaMiddleware();

export default function configStore() {
  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, navMiddleware)
  );
  sagaMiddleware.run(mySaga);
  return store;
}
