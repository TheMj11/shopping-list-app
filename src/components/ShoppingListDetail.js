// src/components/ShoppingListDetail.js
import React, { useState } from 'react';
import { shoppingListData } from '../data';
import './ShoppingListDetail.css'; // Import CSS

function ShoppingListDetail() {
  // Použití useState hooku pro uchování dat o nákupním seznamu
  const [shoppingList, setShoppingList] = useState(shoppingListData);
  const [newItemName, setNewItemName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false); // Nový stav pro filtrování

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

  // Odebrání položky ze seznamu
  const removeItem = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    });
  };

  // Označení položky jako vyřešené/nevyřešené
  const toggleItemResolved = (itemId) => {
    setShoppingList({
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    });
  };

  // Přidání nového člena do seznamu (jen vlastník může přidávat členy)
  const addMember = () => {
    if (shoppingList.owner === "user123" && newMemberName.trim() !== "") {
      setShoppingList({
        ...shoppingList,
        members: [...shoppingList.members, newMemberName],
      });
      setNewMemberName("");
    }
  };

  // Odebrání člena ze seznamu (jen vlastník může odebírat členy)
  const removeMember = (memberName) => {
    setShoppingList({
      ...shoppingList,
      members: shoppingList.members.filter((member) => member !== memberName),
    });
  };

  // Člen může odejít ze seznamu
  const leaveList = (memberName) => {
    setShoppingList({
      ...shoppingList,
      members: shoppingList.members.filter((member) => member !== memberName),
    });
  };

  // Filtrování položek podle stavu (zda jsou vyřešené nebo nevyřešené)
  const filteredItems = shoppingList.items.filter((item) =>
    showOnlyUnresolved ? !item.resolved : true
  );

  return (
    <div className="shopping-list">
      <h1>Nákupní seznam: {shoppingList.name}</h1>

      <h2>Členové:</h2>
      <ul>
        {shoppingList.members.map((member) => (
          <li key={member}>
            {member}
            {shoppingList.owner === "user123" && member !== "user123" && (
              <button onClick={() => removeMember(member)}>Odebrat</button>
            )}
            {member !== shoppingList.owner && (
              <button onClick={() => leaveList(member)}>Odejít</button>
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
