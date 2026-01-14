import { useDispatch, useSelector } from "react-redux";
import { deleteUser, createUser } from "../services/api.user.js";
import { removeUser, setUsers, addUser } from "../storage/store.js";
import { useState } from "react";
import Dialog from "../shared/Dialog.js";
import { useI18n } from "../i18n/I18nContext.js";

function Users(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const { t, interpolate } = useI18n();

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
          <p className="eyebrow">{t('users.eyebrow')}</p>
          <h1>{t('users.title')}</h1>
          <p className="muted">{t('users.description')}</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setIsDialogOpen(true)}>{t('users.addButton')}</button>
          <span className="tag-olive">{interpolate(t('users.totalCount'), { count: users.length })}</span>
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
              <p className="user-email">{user.email || t('users.noEmailOnFile')}</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost user-remove"
              onClick={() => deleteUserAction(user._id)}
              aria-label={interpolate(t('users.deleteLabel'), { name: user.name })}
            >
              {t('users.removeButton')}
            </button>
          </article>
        ))}
      </div>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <h2>{t('users.addNewUserTitle')}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
          <div>
            <label htmlFor="name">{t('users.nameLabel')}</label>
            <input
              id="name"
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">{t('users.emailLabel')}</label>
            <input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">{t('users.addUserButton')}</button>
          <button type="button" className="btn btn-ghost" onClick={() => setIsDialogOpen(false)}>{t('users.cancelButton')}</button>
        </form>
      </Dialog>
    </section>
  );
}

export default Users;
