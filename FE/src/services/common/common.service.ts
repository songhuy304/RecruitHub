import { apiClient } from "@/lib/axios";
import { IResponse } from "@/types/api.type";
import { IDepartment, ILocation } from "./types";

const PATH = {
  GET_LOCATION: "/common/locations",
  GET_DEPARTMENTS: "/common/departments",
};

export const commonService = {
  getLocation: (): Promise<IResponse<ILocation[]>> => apiClient.get(PATH.GET_LOCATION),
  getDepartments: (): Promise<IResponse<IDepartment[]>> =>
    apiClient.get(PATH.GET_DEPARTMENTS),
};
