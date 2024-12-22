import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getShoppingLists = async () => {
  const response = await axios.get(`${API_BASE_URL}/shoppingLists`);
  return response.data;
};

export const getShoppingListDetail = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/shoppingLists/${id}`);
  return response.data;
};

export const addShoppingList = async (newList) => {
  const response = await axios.post(`${API_BASE_URL}/shoppingLists`, newList);
  return response.data;
};

export const deleteShoppingList = async (id) => {
  await axios.delete(`${API_BASE_URL}/shoppingLists/${id}`);
};
