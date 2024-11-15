// redux/order/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserOrders, placeOrder } from "./orderThunk";
import { OrderItems } from "./type";

interface OrderState {
  orders: OrderItems[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  status: "idle",
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling placeOrder thunk states
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Order Rejected";
      })

      // Handling fetchUserOrders thunk states
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<OrderItems[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user orders";
      });
  },
});

export default orderSlice.reducer;
