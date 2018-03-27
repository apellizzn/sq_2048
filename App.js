import React from "react";
import { Provider, connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";
import AppNavigator from "./src/AppNavigator";
import configStore from "./src/Store";

const store = configStore();
const addListener = createReduxBoundAddListener("root");
const mapStateToProps = state => ({
  nav: state.nav
});

class Router extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
      />
    );
  }
}
const AppWithNavigationState = connect(mapStateToProps)(Router);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
