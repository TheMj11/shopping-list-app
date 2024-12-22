import React, { createContext, useState, useContext } from 'react';

const translations = {
  cs: {
    shoppingListsOverview: "Přehled nákupních seznamů",
    addNewList: "Přidat nový seznam",
    showArchived: "Zobrazit i archivované seznamy",
    shoppingList: "Nákupní seznam",
    members: "Členové:",
    addMember: "Přidat člena",
    items: "Položky:",
    addItem: "Přidat položku",
    unresolvedItems: "Zobrazit pouze nevyřešené položky",
    delete: "Smazat",
    confirmDelete: "Opravdu chcete tento seznam smazat?",
    modalHeading: "Přidat nový nákupní seznam",
    placeholder: "Název nákupního seznamu",
    add: "Přidat",
    close: "Zavřít",
    listNotFound: "Seznam nenalezen!",
    markResolved: "Označit jako vyřešené",
    markUnresolved: "Neoznačit jako vyřešené",
    removeItem: "Odebrat položku",
    removeMember: "Odebrat člena",
    addItemPlaceholder: "Název položky",
    toggleTheme: "Přepnout na tmavý režim",
  },
  en: {
    shoppingListsOverview: "Shopping Lists Overview",
    addNewList: "Add New List",
    showArchived: "Show Archived Lists",
    shoppingList: "Shopping List",
    members: "Members:",
    addMember: "Add Member",
    items: "Items:",
    addItem: "Add Item",
    unresolvedItems: "Show Only Unresolved Items",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this list?",
    modalHeading: "Add New Shopping List",
    placeholder: "Shopping List Name",
    add: "Add",
    close: "Close",
    listNotFound: "List not found!",
    markResolved: "Mark as Resolved",
    markUnresolved: "Unmark as Resolved",
    removeItem: "Remove Item",
    removeMember: "Remove Member",
    addItemPlaceholder: "Item Name",
    toggleTheme: "Switch to Dark Mode",
  },
};


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("cs");

  const translate = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
