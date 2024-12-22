// src/components/ShoppingListDetail.js
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Importujeme useParams
import { shoppingListData } from "../data"; // Import dat
import { useLanguage } from "../context/LanguageContext"; // Import jazykového kontextu
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
  const { translate } = useLanguage(); // Použití funkce pro překlad

  // Pokud seznam neexistuje, zobrazíme chybovou hlášku
  if (!foundShoppingList) {
    return <p>{translate("listNotFound")}</p>;
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
      <h1>{translate("shoppingList")}: {shoppingList.name}</h1>

      <h2>{translate("members")}</h2>
      <ul>
        {shoppingList.members &&
          shoppingList.members.map((member) => (
            <li key={member}>
              {member}
              {shoppingList.owner === "user123" && member !== "user123" && (
                <button onClick={() => removeMember(member)}>
                  {translate("removeMember")}
                </button>
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
            placeholder={translate("addMember")}
          />
          <button onClick={addMember}>{translate("addMember")}</button>
        </div>
      )}

      <h2>{translate("items")}</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showOnlyUnresolved}
            onChange={() => setShowOnlyUnresolved(!showOnlyUnresolved)}
          />
          {translate("unresolvedItems")}
        </label>
      </div>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <span style={{ textDecoration: item.resolved ? "line-through" : "none" }}>
              {item.name}
            </span>
            <button onClick={() => toggleItemResolved(item.id)}>
              {item.resolved ? translate("markUnresolved") : translate("markResolved")}
            </button>
            <button onClick={() => removeItem(item.id)}>{translate("removeItem")}</button>
          </li>
        ))}
      </ul>

      <h2>{translate("addItem")}</h2>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder={translate("addItemPlaceholder")}
      />
      <button onClick={addItem}>{translate("add")}</button>
    </div>
  );
}

export default ShoppingListDetail;
