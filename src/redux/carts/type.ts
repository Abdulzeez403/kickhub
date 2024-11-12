export interface CartItem {
  _id: string;
  name: string;
  price: number;
  images: Image[];
  tag: string;
  quantity: number;
  size: string;
  color: string;
}

interface Image {
  uri: string;
  type: string;
  name: string;
}
