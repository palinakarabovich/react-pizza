export type Pizza = {
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: string[];
  id: number;
}

export type PizzaInCart = {
  title: string;
  dough: string;
  size: string;
  price: number;
  quantity: number | 0;
  imageUrl: string;
  id: number;
  _id?: number | string;
  selectedDough: number;
  selectedSize: number;
}

export type PizzaAddToCart = {
  title: string;
  dough: string;
  size: string;
  price: number;
  quantity?: number | 0;
  imageUrl: string;
  id: number;
  _id?: number | string;
  selectedDough: number;
  selectedSize: number;
}

export type Category = {
  name: string; 
  sortProperty: string;
}