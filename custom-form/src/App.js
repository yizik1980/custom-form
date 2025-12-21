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


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const users = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
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

  const selectUser = (userId) => {
    setUserId(userId);
  };
  return (
    <ToastProvider>
      <Router>
        {isLoading && (
        <div className="preloader-overlay" role="status" aria-live="polite">
          <div className="preloader-card">
            <div className="preloader-spinner" aria-hidden="true" />
            <p className="preloader-text">Loading your form fields...</p>
          </div>
        </div>
      )}
      <div className="App">
        <header className="App-header">
          <h1>Custom Form Application</h1>
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
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  calendar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Users
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
          <p>&copy; 2024 Custom Form Application</p>
        </footer>
      </div>
    </Router>
    </ToastProvider>
  );
}

export default App;
