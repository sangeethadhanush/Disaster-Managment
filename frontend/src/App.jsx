import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./pages/Home";
import Monitoring from "./pages/Monitoring";
import Weather from "./pages/Weather";
import Analytics from "./pages/Analytics";
import Emergency from "./pages/Emergency";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* HEADER */}
        <header className="topbar">

          <div className="brand-section">

            <div className="brand-icon">
              🌍
            </div>

            <div>
              <h1>Landslide Early Warning System</h1>
              <p>AI-Powered Disaster Intelligence Platform</p>
            </div>

          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>

        </header>


        {/* NORMAL SCROLLING NAVIGATION */}
        <nav className="main-nav">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/monitoring"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🗺️ Monitoring
          </NavLink>

          <NavLink
            to="/weather"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🌦️ Weather
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📊 Analytics
          </NavLink>

          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🚨 Emergency
          </NavLink>

        </nav>


        {/* PAGE AREA */}
        <main className="page-container">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/monitoring"
              element={<Monitoring />}
            />

            <Route
              path="/weather"
              element={<Weather />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/emergency"
              element={<Emergency />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="not-found">

                  <div className="not-found-icon">
                    🔍
                  </div>

                  <h1>Page Not Found</h1>

                  <p>
                    The page you are looking for does not exist.
                  </p>

                  <NavLink
                    to="/"
                    className="back-home"
                  >
                    ← Back to Dashboard
                  </NavLink>

                </div>
              }
            />

          </Routes>

        </main>


        {/* FOOTER */}
        <footer className="footer">

          <strong>
            🌍 Landslide Early Warning System
          </strong>

          <span>
            AI-powered disaster monitoring and early warning platform
          </span>

        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;