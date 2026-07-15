import { apiClient } from "@/lib/axios";
import { IResponse } from "@/types/api.type";
import { ICreateJobEntity } from "../types";

const PATH = {
  LIST: "/jobs",
  CREATE: "/jobs",
  UPDATE: (jobId: number) => `/jobs/${jobId}`,
};

export const jobService = {
  createJob: (payload: ICreateJobEntity): Promise<IResponse<void>> =>
    apiClient.post(PATH.CREATE, payload),
  updateJob: (payload: ICreateJobEntity, jobId: number): Promise<IResponse<void>> =>
    apiClient.patch(PATH.UPDATE(jobId), payload),
};
