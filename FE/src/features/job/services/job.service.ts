import { apiClient } from "@/lib/axios";
import { IPaginatedResponse, IResponse } from "@/types/api.type";
import { ICreateJobEntity, IJob, IJobQueryParams } from "../types";

const PATH = {
  LIST: "/jobs",
  CREATE: "/jobs",
  UPDATE: (jobId: number) => `/jobs/${jobId}`,
};

export const jobService = {
  getJobs: (params: IJobQueryParams): Promise<IPaginatedResponse<IJob>> =>
    apiClient.get(PATH.LIST, { params }),
  createJob: (payload: ICreateJobEntity): Promise<IResponse<void>> =>
    apiClient.post(PATH.CREATE, payload),
  updateJob: (payload: ICreateJobEntity, jobId: number): Promise<IResponse<void>> =>
    apiClient.patch(PATH.UPDATE(jobId), payload),
};
