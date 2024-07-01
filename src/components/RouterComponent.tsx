import React, {FC} from 'react';
import './App.css';
import CartLayout from './CartLayout';
import NavLayout from './NavLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPageLayout from './CartLayout';


const RouterComponent:FC=()=> {
  return (
    <Router>
      <div>
        <NavLayout />
        <Routes>
          <Route path="/"  element={<CartLayout/>} />
          <Route path="/cart" element={<CartPageLayout/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouterComponent;