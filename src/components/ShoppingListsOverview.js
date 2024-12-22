import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './ShoppingListsOverview.css';

function ShoppingListsOverview() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const heading = translate("shoppingListsOverview");
  const showArchivedLabel = translate("showArchived");
  const addListLabel = translate("addNewList");
  const viewDetailLabel = translate("shoppingList");
  const deleteLabel = translate("delete");
  const confirmDelete = translate("confirmDelete");
  const modalHeading = translate("modalHeading");
  const placeholder = translate("placeholder");
  const addButton = translate("add");
  const closeButton = translate("close");

  useEffect(() => {
    fetch("http://localhost:3001/shoppingLists")
      .then((response) => response.json())
      .then((data) => setShoppingLists(data))
      .catch((error) => console.error("Error fetching shopping lists:", error));
  }, []);

  const addShoppingList = () => {
    if (newListName.trim() !== "") {
      const newList = {
        id: shoppingLists.length + 1,
        name: newListName,
        owner: "user123",
        archived: false,
        items: [],
      };

      setShoppingLists([...shoppingLists, newList]);

      fetch("http://localhost:3001/shoppingLists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add shopping list");
          }
          return response.json();
        })
        .catch((error) => console.error("Error adding shopping list:", error));

      setNewListName("");
      setIsModalOpen(false);
    }
  };

  const deleteShoppingList = (listId) => {
    if (window.confirm(confirmDelete)) {
      setShoppingLists(shoppingLists.filter((list) => list.id !== listId));

      fetch(`http://localhost:3001/shoppingLists/${listId}`, {
        method: "DELETE",
      }).catch((error) =>
        console.error("Error deleting shopping list:", error)
      );
    }
  };

  const filteredShoppingLists = shoppingLists.filter(
    (list) => showArchived || !list.archived
  );

  return (
    <div className="shopping-lists-overview">
      <h1>{heading}</h1>

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
