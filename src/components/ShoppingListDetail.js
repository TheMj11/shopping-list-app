// src/components/ShoppingListDetail.js
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Importujeme useParams
import { shoppingListData } from "../data"; // Import dat
import "./ShoppingListDetail.css"; // Import CSS

function ShoppingListDetail() {
  const { id } = useParams(); // Získání ID seznamu z URL
  const foundShoppingList = shoppingListData.find(
    (list) => list.id.toString() === id
  ); // Najdeme seznam podle ID

  // Stavy jsou definované vždy, i když seznam neexistuje
  const [shoppingList, setShoppingList] = useState(foundShoppingList || {});
  const [newItemName, setNewItemName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false);

  // Pokud seznam neexistuje, zobrazíme chybovou hlášku
  if (!foundShoppingList) {
    return <p>Seznam nenalezen!</p>;
  }

  // Přidání nové položky
  const addItem = () => {
    if (newItemName.trim() !== "") {
      const newItem = {
        id: shoppingList.items.length + 1,
        name: newItemName,
        resolved: false,
      };
      setShoppingList({
        ...shoppingList,
        items: [...shoppingList.items, newItem],
      });
      setNewItemName("");
    }
  };

  // Odebrání položky
  const removeItem = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    });
  };

  // Přepnutí stavu položky (vyřešené/nevyřešené)
  const toggleItemResolved = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  // Přidání nového člena
  const addMember = () => {
    if (shoppingList.owner === "user123" && newMemberName.trim() !== "") {
      setShoppingList({
        ...shoppingList,
        members: [...shoppingList.members, newMemberName],
      });
      setNewMemberName("");
    }
  };

  // Odebrání člena
  const removeMember = (memberName) => {
    setShoppingList({
      ...shoppingList,
      members: shoppingList.members.filter((member) => member !== memberName),
    });
  };

  // Filtrování položek
  const filteredItems = shoppingList.items
    ? shoppingList.items.filter((item) =>
        showOnlyUnresolved ? !item.resolved : true
      )
    : [];

  return (
    <div className="shopping-list">
      <h1>Nákupní seznam: {shoppingList.name}</h1>

      <h2>Členové:</h2>
      <ul>
        {shoppingList.members &&
          shoppingList.members.map((member) => (
            <li key={member}>
              {member}
              {shoppingList.owner === "user123" && member !== "user123" && (
                <button onClick={() => removeMember(member)}>Odebrat</button>
              )}
            </li>
          ))}
      </ul>

      {shoppingList.owner === "user123" && (
        <div>
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder="Přidat člena"
          />
          <button onClick={addMember}>Přidat člena</button>
        </div>
      )}

      <h2>Položky:</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showOnlyUnresolved}
            onChange={() => setShowOnlyUnresolved(!showOnlyUnresolved)}
          />
          Zobrazit pouze nevyřešené položky
        </label>
      </div>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <span style={{ textDecoration: item.resolved ? "line-through" : "none" }}>
              {item.name}
            </span>
            <button onClick={() => toggleItemResolved(item.id)}>
              {item.resolved ? "Neoznačit jako vyřešené" : "Označit jako vyřešené"}
            </button>
            <button onClick={() => removeItem(item.id)}>Odebrat</button>
          </li>
        ))}
      </ul>

      <h2>Přidat novou položku:</h2>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Název položky"
      />
      <button onClick={addItem}>Přidat</button>
    </div>
  );
}

export default ShoppingListDetail;
