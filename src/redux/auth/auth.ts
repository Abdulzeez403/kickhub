import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginPayload, User } from "./type";
import { router } from "expo-router";
import { General_Api } from "../api";

const api = General_Api;

export const login = createAsyncThunk<User, LoginPayload>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });

      // Save token or relevant data to AsyncStorage
      await AsyncStorage.setItem("userToken", response.data.token);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Signup thunk
export const register = createAsyncThunk<User, User>(
  "auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.43.233:5000/api/auth/register",
        signupData
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Pass error to the slice
    }
  }
);

// Async thunk for fetching the current user
export const currentUser = createAsyncThunk<User>(
  "auth/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${api}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch current user");
    }
  }
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk<User>(
  "auth/updateProfile",
  async (profileData) => {
    const response = await axios.put(`${api}auth/update`, profileData);
    return response.data;
  }
);

// Async thunk for logging out
export const logout = createAsyncThunk<void>("auth/logout", async (_) => {
  try {
    await AsyncStorage.removeItem("userToken");
    router.navigate("/home");
  } catch (error) {
    console.error("Logout failed:", error);
  }
});
