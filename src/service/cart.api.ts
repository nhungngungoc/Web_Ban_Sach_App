import type { IBodyResponse } from "@/common/interface/interfaces";
import axiosInstance from "@/plugins/axios";
import { ApiService } from "@/plugins/axios/api";
// import { IBodyUser } from '@/views/Admin/Product/interfaces';
import localStorageAuthService from "@/common/storages/authStorage";
import { IAddCart } from "@/views/Home/interface/cart.interface";

class CartApiService extends ApiService {
  async addCart(formData: IAddCart): Promise<IBodyResponse<any>> {
    return await this.client.post(`${this.baseUrl}`, formData);
  }
  async updateCart(formData: IAddCart): Promise<IBodyResponse<any>> {
    return await this.client.patch(`${this.baseUrl}`, formData);
  }
  async getCart() {
    return await this.client.get(this.baseUrl, {
      headers: {
        Authorization: "Bearer " + localStorageAuthService.getAccessToken(),
      },
    });
  }
}

export const cartServiceApi = new CartApiService(
  { baseUrl: "/Cart" },
  axiosInstance
);
