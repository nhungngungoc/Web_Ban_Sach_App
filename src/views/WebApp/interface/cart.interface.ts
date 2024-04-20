export interface IAddCart {
  ProductId: string;
  Quantity: string;
}
export interface ICart {
  cartId: string;
  userId: string;
  quantity: string;
  productId: string;
  productName: string;
  price: string;
  image: string;
}
export interface IUpdateCart {
  ProductId: string;
  Quantity: string;
  Id: string;
}
