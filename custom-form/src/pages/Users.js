import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../services/api.user.js";
import { removeUser, setUsers } from "../storage/store.js";

function Users(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  const deleteUserAction = (userId) => {
    deleteUser(userId).then(() => {
      // Optionally dispatch an action to remove the user from the store
      userId && dispatch(removeUser(userId));
      dispatch(setUsers(users.filter((user) => user._id !== userId)));
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
        <span className="tag-olive">{users.length} total</span>
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
    </section>
  );
}

export default Users;
