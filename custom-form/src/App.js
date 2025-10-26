import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Main from "./Main.js";
import { useEffect } from "react";
import { setItems } from "./storage/store.js";
const API = "http://localhost:5000/api/";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(API + "items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items from server:", data);
        const itemsToSet = data?.items ?? (Array.isArray(data) ? data : []);
        dispatch(setItems(itemsToSet));
        console.log("Dispatched items to Redux:", itemsToSet);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);
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
