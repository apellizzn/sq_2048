import { StackNavigator } from "react-navigation";
import { GameScreen, MainScreen, SplashScreen } from "./screens";
export default StackNavigator(
  {
    Game: GameScreen,
    Main: MainScreen,
    Splash: SplashScreen
  },
  {}
);
