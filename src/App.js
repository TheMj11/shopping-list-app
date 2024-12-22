import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingListsOverview from "./components/ShoppingListsOverview";
import ShoppingListDetail from "./components/ShoppingListDetail";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light"); // Přidání stavu pro téma

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        {/* Tlačítko pro přepínání režimu */}
        <button onClick={toggleTheme}>
          Přepnout na {theme === "light" ? "tmavý" : "světlý"} režim
        </button>

        {/* Routování */}
        <Routes>
          <Route path="/shopping-lists" element={<ShoppingListsOverview />} />
          <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
