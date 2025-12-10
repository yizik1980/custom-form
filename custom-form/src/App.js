import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Users from "./pages/Users.js";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
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
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About
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
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
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
  );
}

export default App;
