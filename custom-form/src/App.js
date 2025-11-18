import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Main from "./Main.js";
import { useEffect, useState } from "react";
import { listItems, createItem } from "./services/api.js";
import { setItems, addItem } from "./storage/store.js";
const API = "http://localhost:4500/api/";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await listItems();
        const itemsToSet = data || [];
        dispatch(setItems(itemsToSet));
      } catch (err) {
        console.error("Error fetching items (async):", err);
        setError("We couldn't load the latest form fields. Please try again.");
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {};
  }, []);
  const items = useSelector((state) => state.app.inputs);

  const addNewInput = async (value, type) => {
    try {
      const created = await createItem({ value, type });
      created && dispatch(addItem(created));
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

      <Main items={items} addMethod={addNewInput} />

      {error && !isLoading && (
        <div className="preloader-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
