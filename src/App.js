import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalCombonents/ThemeProvider";
import { BrowserRouter, Route, Routes, Link, NavLink } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/User/Login";

// import './GlobalCombonents/ThemeProvider'

function App() {
  const [theme] = useThemeHook();
  return (
    <BrowserRouter>
      <>
        <main
          className={theme ? "bg-black" : "bg-light-2"}
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
