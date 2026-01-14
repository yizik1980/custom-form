import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.js";
import Users from "./pages/Users.js";
import { useSelector } from "react-redux";
import SelectionUser from './common/UserSelect.js';
import Calendar from "./pages/Calendar.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listUsers } from "./services/api.user.js";
import { setUsers } from "./storage/store.js";
import { ToastProvider } from './shared/Toast/ToastContext.js';
import Loading from "./shared/Loading.js";
import { useI18n } from './i18n/I18nContext.js';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const users = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const { t } = useI18n();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userListResponse = await listUsers();
        dispatch(setUsers(userListResponse));
      } catch (err) {
        console.error("Error fetching items (async):", err);
        setError(t('error.failedToLoad'));
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {};
  }, [dispatch, t]);

  const selectUser = (userId) => {
    setUserId(userId);
  };
  return (
    <ToastProvider>
      <Router>
       <Loading isLoading={isLoading}></Loading>
      <div className="App">
        <header className="App-header">
          <h1>{t('app.title')}</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {t('nav.home')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {t('nav.calendar')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {t('nav.users')}
                </NavLink>
              </li>
            </ul>
          </nav>
            <SelectionUser selectUser={selectUser} users={users}></SelectionUser>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home selectedUser={userId} />} />
            <Route path="/calendar" element={<Calendar selectedUser={userId}  />} />
            <Route path="/users" element={<Users />} />
          </Routes>
             {error && !isLoading && (
          <div className="preloader-error" role="alert">
            {error}
          </div>
        )}
        </main>
        <footer className="App-footer">
          <p>{t('app.copyright')}</p>
        </footer>
      </div>
    </Router>
    </ToastProvider>
  );
}

export default App;
