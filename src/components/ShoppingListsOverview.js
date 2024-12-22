// src/components/ShoppingListsOverview.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import jazykového kontextu
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
  const { translate } = useLanguage(); // Použití funkce pro překlad
  const navigate = useNavigate();

  // Lokalizované texty pomocí funkce translate
  const heading = translate("shoppingListsOverview");
  const showArchivedLabel = translate("showArchived");
  const addListLabel = translate("addNewList");
  const viewDetailLabel = translate("shoppingList");
  const deleteLabel = translate("delete"); // Používáme "Smazat" nebo "Delete" podle jazyka
  const confirmDelete = translate("confirmDelete");
  const modalHeading = translate("modalHeading");
  const placeholder = translate("placeholder");
  const addButton = translate("add");
  const closeButton = translate("close");

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
    if (window.confirm(confirmDelete)) {
      setShoppingLists(shoppingLists.filter(list => list.id !== listId));
    }
  };

  // Filtrování seznamů podle archivace
  const filteredShoppingLists = shoppingLists.filter(
    (list) => showArchived || !list.archived
  );

  return (
    <div className="shopping-lists-overview">
      <h1>{heading}</h1>

      {/* Checkbox pro filtrování archivovaných seznamů */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
          {showArchivedLabel}
        </label>
      </div>

      <div className="shopping-lists-grid">
        {filteredShoppingLists.map((list) => (
          <div key={list.id} className="shopping-list-tile">
            <h3>{list.name}</h3>
            <button onClick={() => navigate(`/shopping-list/${list.id}`)}>
              {viewDetailLabel}
            </button>
            {list.owner === "user123" && (
              <button onClick={() => deleteShoppingList(list.id)}>
                {deleteLabel}
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)}>{addListLabel}</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalHeading}</h2>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder={placeholder}
            />
            <button onClick={addShoppingList}>{addButton}</button>
            <button onClick={() => setIsModalOpen(false)}>{closeButton}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingListsOverview;
