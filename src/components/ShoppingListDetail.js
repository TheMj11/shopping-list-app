import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./ShoppingListDetail.css";

function ShoppingListDetail() {
  const { id } = useParams();
  const { translate } = useLanguage();
  const [shoppingList, setShoppingList] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/shoppingLists/${id}`)
      .then((response) => response.json())
      .then((data) => setShoppingList(data))
      .catch((error) =>
        console.error("Error fetching shopping list detail:", error)
      );
  }, [id]);

  const addItem = () => {
    if (newItemName.trim() !== "") {
      const newItem = {
        id: shoppingList.items.length + 1,
        name: newItemName,
        resolved: false,
      };

      const updatedList = {
        ...shoppingList,
        items: [...shoppingList.items, newItem],
      };

      setShoppingList(updatedList);

      fetch(`http://localhost:3001/shoppingLists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      }).catch((error) => console.error("Error adding item:", error));

      setNewItemName("");
    }
  };

  const removeItem = (itemId) => {
    const updatedList = {
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    };

    setShoppingList(updatedList);

    fetch(`http://localhost:3001/shoppingLists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    }).catch((error) => console.error("Error removing item:", error));
  };

  const toggleItemResolved = (itemId) => {
    const updatedList = {
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, resolved: !item.resolved } : item
      ),
    };

    setShoppingList(updatedList);

    fetch(`http://localhost:3001/shoppingLists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    }).catch((error) => console.error("Error toggling item resolved:", error));
  };

  const addMember = () => {
    if (shoppingList.owner === "user123" && newMemberName.trim() !== "") {
      const updatedList = {
        ...shoppingList,
        members: [...shoppingList.members, newMemberName],
      };

      setShoppingList(updatedList);

      fetch(`http://localhost:3001/shoppingLists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      }).catch((error) => console.error("Error adding member:", error));

      setNewMemberName("");
    }
  };

  const removeMember = (memberName) => {
    const updatedList = {
      ...shoppingList,
      members: shoppingList.members.filter((member) => member !== memberName),
    };

    setShoppingList(updatedList);

    fetch(`http://localhost:3001/shoppingLists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    }).catch((error) => console.error("Error removing member:", error));
  };

  if (!shoppingList) {
    return <p>{translate("loading")}</p>;
  }

  const filteredItems = shoppingList.items
    ? shoppingList.items.filter((item) =>
        showOnlyUnresolved ? !item.resolved : true
      )
    : [];

  return (
    <div className="shopping-list">
      <h1>
        {translate("shoppingList")}: {shoppingList.name}
      </h1>

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
            <span
              style={{ textDecoration: item.resolved ? "line-through" : "none" }}
            >
              {item.name}
            </span>
            <button onClick={() => toggleItemResolved(item.id)}>
              {item.resolved
                ? translate("markUnresolved")
                : translate("markResolved")}
            </button>
            <button onClick={() => removeItem(item.id)}>
              {translate("removeItem")}
            </button>
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
