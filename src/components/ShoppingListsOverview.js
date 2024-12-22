// src/components/ShoppingListsOverview.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingListsOverview.css';

const defaultShoppingLists = [
  { id: 1, name: "Týdenní nákup", owner: "user123", archived: false },
  { id: 2, name: "Party nákup", owner: "user456", archived: false },
  { id: 3, name: "Zimní dovolená", owner: "user123", archived: true }
];

function ShoppingListsOverview() {
  const [shoppingLists, setShoppingLists] = useState(defaultShoppingLists);
  const [newListName, setNewListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false); // Přidání stavu pro filtrování
  const navigate = useNavigate();

  // Přidání nového seznamu
  const addShoppingList = () => {
    if (newListName.trim() !== "") {
      const newList = {
        id: shoppingLists.length + 1,
        name: newListName,
        owner: "user123",
        archived: false
      };
      setShoppingLists([...shoppingLists, newList]);
      setNewListName("");
      setIsModalOpen(false);
    }
  };

  // Odebrání seznamu (jen vlastník může odebrat)
  const deleteShoppingList = (listId) => {
    if (window.confirm("Opravdu chcete odebrat tento seznam?")) {
      setShoppingLists(shoppingLists.filter(list => list.id !== listId));
    }
  };

  // Filtrování seznamů podle archivace
  const filteredShoppingLists = shoppingLists.filter(
    (list) => showArchived || !list.archived
  );

  return (
    <div className="shopping-lists-overview">
      <h1>Přehled nákupních seznamů</h1>

      {/* Checkbox pro filtrování archivovaných seznamů */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
          Zobrazit i archivované seznamy
        </label>
      </div>

      <div className="shopping-lists-grid">
        {filteredShoppingLists.map((list) => (
          <div key={list.id} className="shopping-list-tile">
            <h3>{list.name}</h3>
            <button onClick={() => navigate(`/shopping-list/${list.id}`)}>
              Zobrazit detail
            </button>
            {list.owner === "user123" && (
              <button onClick={() => deleteShoppingList(list.id)}>
                Odebrat
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)}>Přidat nový seznam</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Přidat nový nákupní seznam</h2>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Název nákupního seznamu"
            />
            <button onClick={addShoppingList}>Přidat</button>
            <button onClick={() => setIsModalOpen(false)}>Zavřít</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingListsOverview;
