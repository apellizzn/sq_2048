import AppNavigator from "../AppNavigator";
import { NavigationActions } from "react-navigation";

const initialNavState = {
  index: 0,
  routes: [{ routeName: "Main" }]
};
export default function nav(state = initialNavState, action) {
  let nextState = { ...state };
  switch (action.type) {
    case "NAVIGATE_GAME":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "Game"
        }),
        state
      );
      break;

    case "Navigation/BACK":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    default:
      break;
  }
  return nextState;
}
