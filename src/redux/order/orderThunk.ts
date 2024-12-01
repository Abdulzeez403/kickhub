import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OrderItems } from "./type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { General_Api } from "../api";

const API_URL = `${General_Api}/orders`;

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (items: OrderItems) => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.post(API_URL, items, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to place order");
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (userId: string) => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await axios.get(`${API_URL}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user orders");
    }
  }
);
