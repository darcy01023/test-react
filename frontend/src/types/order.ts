export type OrderProduct = {
  product: string;
  quantity: number;
};

export type Order = {
  _id: string;
  owner: {
    _id: string;
    username: string;
    email: string;
  };
  products: OrderProduct[];
  price: number;
  delivered: boolean;
  address: string;
};