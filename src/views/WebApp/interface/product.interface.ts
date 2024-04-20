import { ICommonListQuery } from "@/common/interface/interfaces";

export interface IProduct {
  id: string;
  tenSP: string;
  image: string;
  moTa: string;
  gia: number;
  tenTacGia: string;
}
export interface IQueryProduct extends ICommonListQuery {
  categoryId?: string;
}
