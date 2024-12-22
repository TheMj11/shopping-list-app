import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingListsOverview from "./components/ShoppingListsOverview";
import ShoppingListDetail from "./components/ShoppingListDetail";
import { useLanguage } from "./context/LanguageContext";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const { language, setLanguage, translate } = useLanguage();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <button onClick={toggleTheme}>
          {translate("toggleTheme")}
        </button>
        <select value={language} onChange={handleLanguageChange}>
          <option value="cs">Čeština</option>
          <option value="en">English</option>
        </select>
        <Routes>
          <Route path="/shopping-lists" element={<ShoppingListsOverview />} />
          <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
