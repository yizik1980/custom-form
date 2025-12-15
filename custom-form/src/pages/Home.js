import { useSelector, useDispatch } from "react-redux";
import Main from "../main/Main.js";
import { useEffect, useMemo } from "react";
import { listItems, createItem, deleteItem } from "../services/api.js";
import { setItems, addItem, removeItem } from "../storage/store.js";

function Home({selectedUser}) {
  const dispatch = useDispatch();
  // Fetch items only once on mount
  useEffect(() => {
    const fetchItems = async () => {
      const itemsToSet = (await listItems()) || [];
      dispatch(setItems(itemsToSet));
    };
    fetchItems();
  }, [dispatch]);

  // Get items from Redux
  const items = useSelector((state) => {
    return state.app.inputs.map((input) => {
      const userItem = state.app.usersObject[input.user];
      return { ...input, userItem };
    });
  });

 // const selectedUser = useSelector((state) =>  state.app.selectedUser);
    // useMemo RETURNS a value, doesn't call setState
  const filteredItems = useMemo(() => {
    const filtered = items?.filter((item) => {
      if (!selectedUser) return true;
      return item.user === selectedUser;
    });
    return filtered; // RETURN the value
  }, [items, selectedUser]);

  // Add / remove
  const addNewInput = async (arg) => {
    try {
      const created = await createItem({ ...arg });
      if (created) dispatch(addItem(created));
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
    <div className="home-shell">
      <section className="panel">
        <Main
          items={filteredItems}
          addMethod={addNewInput}
          deleteMethod={removeInput}
        />
      </section>
    </div>
  );
}

export default Home;
