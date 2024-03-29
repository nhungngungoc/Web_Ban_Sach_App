import type {
    IBodyResponse,
    ICommonListQuery,
  } from "@/common/interface/interfaces";
  import localStorageAuthService from "@/common/storages/authStorage";
  import axiosInstance from "@/plugins/axios";
  import { ApiService } from "@/plugins/axios/api";
  
  class CategoryApiService extends ApiService {
    async create(formData: FormData): Promise<IBodyResponse<any>> {
      return await this.client.post(`${this.baseUrl}`, formData);
    }
    async update(
      id: string,
      formData: FormData
    ): Promise<IBodyResponse<any>> {
      return await this.client.put(`${this.baseUrl}/${id}`, formData);
    }
  }
  export const categoryServiceApi = new CategoryApiService(
    { baseUrl: "/Category" },
    axiosInstance
  );
  