import type { IBodyResponse } from "@/common/interface/interfaces";
import axiosInstance from "@/plugins/axios";
import { ApiService } from "@/plugins/axios/api";
class HuyenApiService extends ApiService {
  async getAll(maTinh: string): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/byMaTinh/${maTinh}`);
  }
}

export const huyenServiceApi = new HuyenApiService(
  { baseUrl: "/Huyen" },
  axiosInstance
);
