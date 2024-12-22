import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingListsOverview from "./components/ShoppingListsOverview";
import ShoppingListDetail from "./components/ShoppingListDetail";
import { useLanguage } from "./context/LanguageContext"; // Import jazykového kontextu
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light"); // Přidání stavu pro téma
  const { language, setLanguage } = useLanguage(); // Přístup k jazykovému kontextu

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Nastavení nového jazyka
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        {/* Tlačítko pro přepínání režimu */}
        <button onClick={toggleTheme}>
          Přepnout na {theme === "light" ? "tmavý" : "světlý"} režim
        </button>

        {/* Přepínač jazyka */}
        <select value={language} onChange={handleLanguageChange}>
          <option value="cs">Čeština</option>
          <option value="en">English</option>
        </select>

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
