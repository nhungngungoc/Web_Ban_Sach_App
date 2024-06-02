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
class DashboardApiService extends ApiService {
  async getDashboard() {
    return await this.client.get(`${this.baseUrl}`);
  }
}

export const dashboardServiceApi = new DashboardApiService(
  { baseUrl: "/Dashboard" },
  axiosInstance
);
