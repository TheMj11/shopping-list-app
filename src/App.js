// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingListDetail from './components/ShoppingListDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<h1>Vítejte v aplikaci Nákupní seznam!</h1>} />
          <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
