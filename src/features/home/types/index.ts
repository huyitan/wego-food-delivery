export type Category = {
  id: string;
  name: string;
}

export enum Promotion {
  GIFT = 'gift',
  DISCOUNT = 'discount'
}

export type Store = {
  id: string;
  index: number;
  rating: number;
  promotion?: Promotion;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
}