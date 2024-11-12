import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.43.233:5000/api/products"; // Adjust based on your backend

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
