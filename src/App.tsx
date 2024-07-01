import React, { FC } from "react";
import "./App.css";
import CartLayout from "./components/CartLayout";
import NavLayout from "./components/NavLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPageLayout from "./components/CartPageLayout";

const App: FC = () => {
  return (
    <Router>
      <div>
        <NavLayout />
        <Routes>
          <Route path="/" element={<CartLayout />} />
          <Route path="/cart" element={<CartPageLayout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
