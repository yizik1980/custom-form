import {  useSelector } from "react-redux";
import "./App.css";
import Main from "./Main.js";

function App() {
  const items = useSelector((state) => state.app.items);
  //const dispatch = useDispatch();
  console.log("Items from Redux Store:", items);
  return (
    <div className="App">
      <Main items={items} />
    </div>
  );
}

export default App;
