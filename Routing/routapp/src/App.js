import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Bio from "./Bio";
import { useState } from "react";
import Protected from "./Protected";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    setisLoggedIn(false);
  };
  return (
    <>
      {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={logIn}>Login</button>
      )}
      <nav>
        <ul>
          <li>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "red" : "pink" })}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "red" : "pink" })}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "red" : "pink" })}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about">
          <Route index element={<About />} />
          <Route path="me" element={<Bio />} />
        </Route>
        <Route
          path="/contact"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Contact /> 
            </Protected>
          }
        />
        <Route path="*" element="Invalid Route" />
      </Routes>
    </>
  );
}

export default App;
