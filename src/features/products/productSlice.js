import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";

const initialState = {
  products: [],
  status: "idle",
};

// calling api function
export const fetchAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();

    return response.data;
  }
);

// reducers
export const productSlice = createSlice({
  name: "products",
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
        state.products = action.payload; // all fetch item are being updated in selected array
      });
  },
});

// export const {  } = productSlice.actions;

export default productSlice.reducer;
