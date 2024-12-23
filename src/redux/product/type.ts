export interface IProduct {
  _id?: any;
  name: string;
  description: string;
  price: number;
  category: string;
  tag: string;
  stock: number;
  images: IImage[];
  rating?: number;
  numReviews?: number;
}

export interface IImage {
  uri: string;
  type: string;
  name: string;
}
