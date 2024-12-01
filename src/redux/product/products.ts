import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { General_Api } from "../api";

const API_URL = `${General_Api}/products`;

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data.products;
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId: string) => {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  }
);
