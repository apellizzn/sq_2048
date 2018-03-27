import { StackNavigator } from "react-navigation";
import { GameScreen, MainScreen } from "./screens";
export default StackNavigator(
  {
    Game: GameScreen,
    Main: MainScreen
  },
  {}
);
