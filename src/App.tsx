import React from "react";
import Header from './components/Header';
import { Routes, Route } from "react-router";
import MainPage from "./components/MainPage";
import Cart from "./components/Cart";

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
