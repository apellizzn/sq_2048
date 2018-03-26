import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6d7da",
    height: "100%",
    width: "100%",
    borderWidth: 5,
    borderColor: "#333333"
  },
  cellText: {
    fontSize: 36
  },
  rowMargin: {
    margin: 1
  },
  colMargin: {
    margin: 1
  },
  cell_2: {
    backgroundColor: "#ffff99"
  },
  cell_4: { backgroundColor: "#ffcc66" },
  cell_8: { backgroundColor: "#ffcc00" },
  cell_16: { backgroundColor: "#ff9900" },
  cell_32: { backgroundColor: "#ff6600" },
  cell_64: { backgroundColor: "#ff5050" },
  cell_128: { backgroundColor: "#ff3300" },
  cell_256: { backgroundColor: "#ff0000" },
  cell_1024: { backgroundColor: "#cc3300" },
  cell2048: { backgroundColor: "#990000" }
});
export default styles;
