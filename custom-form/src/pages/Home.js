import { useSelector, useDispatch } from "react-redux";
import Main from "../main/Main.js";
import { useEffect, useState } from "react";
import { listItems, createItem, deleteItem } from "../services/api.js";
import { listUsers } from "../services/api.user.js";
import { setItems, addItem, removeItem, setUsers } from "../storage/store.js";

function Home(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await listItems();
        const itemsToSet = data || [];
        dispatch(setItems(itemsToSet));
        setFilteredItems(itemsToSet);
        const userListResponse = await listUsers();

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

  const items = useSelector((state) => {
    return state.app.inputs.map((input) => {
      const user = state.app.usersObject[input.user];
      return { ...input, user };
    });
  });

  const users = useSelector((state) => state.app.users);

  const selectUser = (userId) => {
    const filteredItems = items?.filter((item) => item.user._id === userId);
    setFilteredItems(filteredItems);
  };

  const addNewInput = async (arg) => {
    try {
      const created = await createItem({ ...arg });
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
      setFilteredItems((prevItems) => {
        return prevItems.filter((item) => item._id !== id);
      });
    } catch (err) {
      console.error("Error deleting item:", err);
      throw err;
    }
  };
  return (
    <div className="home-shell">
      {isLoading && (
        <div className="preloader-overlay" role="status" aria-live="polite">
          <div className="preloader-card">
            <div className="preloader-spinner" aria-hidden="true" />
            <p className="preloader-text">Loading your form fields...</p>
          </div>
        </div>
      )}

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Form canvas</p>
            <h3 className="panel-title">Manage fields</h3>
          </div>
          <p className="muted">
            Add fields, assign to users, and preview instantly.
          </p>
        </div>

        <Main
          items={filteredItems}
          addMethod={addNewInput}
          deleteMethod={removeInput}
          selectUser={selectUser}
          users={users}
        />

        {error && !isLoading && (
          <div className="preloader-error" role="alert">
            {error}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
