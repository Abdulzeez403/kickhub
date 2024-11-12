import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderItems } from "./type";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.43.233:5000/api/orders"; // Adjust based on your backend

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (items: OrderItems) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(API_URL, items, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to place order"); // You can further customize error handling
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user orders");
    }
  }
);
