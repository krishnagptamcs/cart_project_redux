// A mock function to mimic making an async request for data

import axios from "axios";

// TO GET ALL ITEM OF CART
export function fetchItems() {
  return axios.get("http://localhost:8080/cart");
}

// TO ADD ITEMS IN CART
export function addItems(item) {
  
  return axios.post("http://localhost:8080/cart", item);
}

//TO UPDATE ITEM IN CART
export function updateItems(id, itemUpdate) {
  return axios.patch(`http://localhost:8080/cart/${id}`, itemUpdate);
}

// TO DELETE ITEM FROM CART
export function deleteItems(id) {
  return axios.delete(`http://localhost:8080/cart/${id}`);
}
