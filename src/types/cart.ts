import { ProductType } from './product';

export interface CartItem {
  product: ProductType;
  quantity: number;
  selectedVariant: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
