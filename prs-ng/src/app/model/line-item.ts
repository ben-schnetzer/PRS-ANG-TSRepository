import { Product } from './product';
import { Request } from './request';

export class LineItem {
  id: number;
  product: Product;
  request: Request;
  quantity: number;

  constructor(
    id: number = 0,
    requestId: Request = new Request(),
    productId: Product = new Product(),
    quantity: number = 0
  ) {
    this.id = id;
    this.request = requestId;
    this.product = productId;
    this.quantity = quantity;
  }
}