import AppNavigator from "../AppNavigator";
import { NavigationActions } from "react-navigation";

const initialNavState = {
  index: 0,
  routes: [{ routeName: "Splash", key: "splash" }]
};

const loggedInNavState = {
  index: 0,
  routes: [{ routeName: "Main", key: "main" }]
};

export default function nav(state = initialNavState, action) {
  let nextState = {};
  switch (action.type) {
    case "Navigation":
      const { routeName } = action.payload;
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName }),
        state
      );
      break;
    case "LOGIN_SUCCEEDED":
      nextState = { ...loggedInNavState };
      break;
    case "Navigation/BACK":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    default:
      nextState = { ...state };
      break;
  }
  return nextState;
}
