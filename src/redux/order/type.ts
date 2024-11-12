export interface OrderItems {
  items: {
    _id: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
}
