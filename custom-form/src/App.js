import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Main from "./Main.js";
import { useEffect, useRef, useState } from "react";
import { listItems } from "./services/api.js";
import { setItems } from "./storage/store.js";
const API = "http://localhost:4500/api/";

function App() {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    console.log(hasFetched);
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await listItems();
        console.log("Data from server (async):", data);
        const itemsToSet = data?.items || [];
        dispatch(setItems(itemsToSet));
        console.log("Fetched items from server (async):", itemsToSet);
      } catch (err) {
        console.error("Error fetching items (async):", err);
        setError("We couldn't load the latest form fields. Please try again.");
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      hasFetched.current = false;
    };
  }, [dispatch]);
  const items = useSelector((state) => state.app.items);

  const addMethod = async (value, type) => {
    try {
      const res = await fetch(`${API}items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, type }),
      });
      console.log("Response from server after adding item:", res);
      if (!res.ok)
        throw new Error(`Failed to add item: ${res.status} ${res.statusText}`);
      const created = await res.json();

      // refresh items in store after successful create
      const data = await listItems();
      const itemsToSet = data?.items || [];
      dispatch(setItems(itemsToSet));

      return created;
    } catch (err) {
      console.error("Error adding item:", err);
      throw err;
    }
  };

  return (
    <div className="App">
      {isLoading && (
        <div className="preloader-overlay" role="status" aria-live="polite">
          <div className="preloader-card">
            <div className="preloader-spinner" aria-hidden="true" />
            <p className="preloader-text">Loading your form fields...</p>
          </div>
        </div>
      )}

      <Main items={items} addMethod={addMethod} />

      {error && !isLoading && (
        <div className="preloader-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
