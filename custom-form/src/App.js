import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Main from "./Main.js";
import { useEffect, useState } from "react";
import {
  listItems,
  createItem,
  deleteItem,
  listUsers,
} from "./services/api.js";
import { setItems, addItem, removeItem, setUsers } from "./storage/store.js";

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
        const userListResponse = await listUsers();
        console.log(userListResponse);
        dispatch(setUsers(userListResponse));
      } catch (err) {
        console.error("Error fetching items (async):", err);
        setError("We couldn't load the latest form fields. Please try again.");
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {};
  }, [dispatch]);
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

  const removeInput = async (id) => {
    try {
      await deleteItem(id);
      dispatch(removeItem(id));
    } catch (err) {
      console.error("Error deleting item:", err);
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

      <Main items={items} addMethod={addNewInput} deleteMethod={removeInput} />

      {error && !isLoading && (
        <div className="preloader-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
