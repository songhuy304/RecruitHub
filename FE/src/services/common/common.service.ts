import { apiClient } from "@/lib/axios";
import { IResponse } from "@/types/api.type";
import { ILocation } from "./types";

const PATH = {
  GET_LOCATION: "/common/locations",
};

export const commonService = {
  getLocation: (): Promise<IResponse<ILocation[]>> => apiClient.get(PATH.GET_LOCATION),
};
