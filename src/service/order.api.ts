import type { IBodyResponse } from "@/common/interface/interfaces";
import axiosInstance from "@/plugins/axios";
import { ApiService } from "@/plugins/axios/api";
interface IOrderCreate {
  NguoiNhan: string;
  Phone: string;
  DiaChi: string;
  Total: number;
  cartId: string[];
  TypePay: string;
}
class OrderApiService extends ApiService {
  async createOrder(data: IOrderCreate) {
    return await this.client.post(`${this.baseUrl}`, data);
  }
  async VnPay(data: IOrderCreate) {
    return await this.client.post(`${this.baseUrl}/VnPay`, data);
  }
}

export const orderServiceApi = new OrderApiService(
  { baseUrl: "/Order" },
  axiosInstance
);
