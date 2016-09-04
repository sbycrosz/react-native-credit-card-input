import Example from "./Example";
import { AppRegistry, UIManager } from "react-native";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('example', () => Example);
