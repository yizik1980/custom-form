import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Main from "./Main.js";
import { useEffect, useRef } from "react";
import { listItems } from "./services/api.js";
import { setItems } from "./storage/store.js";
const API = "http://localhost:5000/api/";

function App() {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    console.log(hasFetched);
    (async () => {
      try {
        const data = await listItems();
        console.log("Data from server (async):", data);
        const itemsToSet = data?.items || [];
        dispatch(setItems(itemsToSet));
        console.log("Fetched items from server (async):", itemsToSet);
      } catch (err) {
        console.error("Error fetching items (async):", err);
      }
    })();
    return () => {
      hasFetched.current = false;
    };
  }, []);
  const items = useSelector((state) => state.app.items);
  console.log("Items from Redux Store:", items);
  return (
    <div className="App">
      <Main items={items} />
    </div>
  );
}

export default App;
