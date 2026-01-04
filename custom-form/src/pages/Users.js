import { useDispatch, useSelector } from "react-redux";
import { deleteUser, createUser } from "../services/api.user.js";
import { removeUser, setUsers, addUser } from "../storage/store.js";
import { useState } from "react";
import Dialog from "../shared/Dialog.js";

function Users(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const deleteUserAction = (userId) => {
    deleteUser(userId).then(() => {
      // Optionally dispatch an action to remove the user from the store
      userId && dispatch(removeUser(userId));
      dispatch(setUsers(users.filter((user) => user._id !== userId)));
    });
  };

  const handleAddUser = () => {
    createUser(newUser).then((createdUser) => {
      dispatch(addUser(createdUser));
      setIsDialogOpen(false);
      setNewUser({ name: "", email: "" });
    });
  };
  return (
    <section className="users-section">
      <div className="users-header">
        <div>
          <p className="eyebrow">Team directory</p>
          <h1>Users</h1>
          <p className="muted">Manage the users linked to your form submissions.</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setIsDialogOpen(true)}>Add User</button>
          <span className="tag-olive">{users.length} total</span>
        </div>
      </div>

      <div className="user-grid" role="list">
        {users.map((user) => (
          <article className="user-card" key={user._id} role="listitem">
            <div className="user-avatar" aria-hidden="true">
              {user.name?.slice(0, 2)?.toUpperCase() || "US"}
            </div>
            <div className="user-body">
              <h3>{user.name}</h3>
              <p className="user-email">{user.email || "No email on file"}</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost user-remove"
              onClick={() => deleteUserAction(user._id)}
              aria-label={`Delete ${user.name}`}
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h2>Add New User</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add User</button>
          <button type="button" className="btn btn-ghost" onClick={() => setIsDialogOpen(false)}>Cancel</button>
        </form>
      </Dialog>
    </section>
  );
}

export default Users;
