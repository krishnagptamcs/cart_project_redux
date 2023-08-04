import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, addItems, updateItems, deleteItems } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

// calling api function
export const fetchAsync = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();

  return response.data;
});

// adding items api call

export const addAsync = createAsyncThunk("cart/addItem", async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const response = await addItems({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });
  return response.data;
});

// delete item api call

export const deleteAsync = createAsyncThunk("cart/deleteItem", async (id) => {
  await deleteItems(id);
  return id;
});

// update slice api call
export const updateAsync = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItems(id, change);
    return response.data;
  }
);

// reducers
export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},

  // to handel async operation
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload); // here we are adding quantitiy
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
