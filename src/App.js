import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalCombonents/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/User/Login";
import DetailComponent from "./Components/DetailComponent/DetailComponent";
import NotFound404 from "./Pages/NotFound404";

import { useState } from "react";
// import './GlobalCombonents/ThemeProvider'

function App() {
  const [theme] = useThemeHook();
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  return (
    <BrowserRouter>
      <>
        <main
          className={theme ? "bg-url-dark" : "bg-url-light"}
          style={{ height: "100vh", overflowY: "auto" }}
        >
          {/* {token && <Header />} */}
          <Header />

          <Routes>
            <Route
              path="/"
              // element={
              //   token ? <Home /> : <Login token={token} setToken={setToken} />
              // }
              element={ <Home />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:id" element={<DetailComponent />} />
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
