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
  async getOrders() {
    return await this.client.get(`${this.baseUrl}/getListOrderByUserId`);
  }
  async getOrderDetail(orderId: string) {
    return await this.client.get(
      `${this.baseUrl}/getListOrderDetailByUserId/${orderId}`
    );
  }
}

export const orderServiceApi = new OrderApiService(
  { baseUrl: "/Order" },
  axiosInstance
);
