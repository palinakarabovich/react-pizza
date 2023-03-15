import React from "react";
import Header from './components/Header';
import { Routes, Route, Navigate } from "react-router";
import MainPage from "./components/MainPage";
import Cart from "./components/Cart";

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/react-pizza/' element={<MainPage />} />
          <Route path='/react-pizza/cart' element={<Cart />} />
          <Route
            path="*"
            element={<Navigate to="react-pizza/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
