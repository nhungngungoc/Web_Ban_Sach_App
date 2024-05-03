import type { IBodyResponse } from "@/common/interface/interfaces";
import axiosInstance from "@/plugins/axios";
import { ApiService } from "@/plugins/axios/api";
class TinhApiService extends ApiService {
  async getAll(): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}`);
  }
}

export const tinhServiceApi = new TinhApiService(
  { baseUrl: "/Tinh" },
  axiosInstance
);
