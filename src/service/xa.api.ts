import type { IBodyResponse } from "@/common/interface/interfaces";
import axiosInstance from "@/plugins/axios";
import { ApiService } from "@/plugins/axios/api";
class XaApiService extends ApiService {
  async getAll(maHuyen: string): Promise<IBodyResponse<any>> {
    return await this.client.get(`${this.baseUrl}/byMaHuyen/${maHuyen}`);
  }
}

export const xaServiceApi = new XaApiService({ baseUrl: "/Xa" }, axiosInstance);
