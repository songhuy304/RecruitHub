import { IPagination } from "@/types/api.type";

export interface IJoinRequest {
  id: number;
  teamId: number;
}

export interface IFormFilterJoinRequest extends IPagination {
  search?: string;
}

export interface IApproveJoinRequestPayload extends IJoinRequest {}
export interface IRejectJoinRequestPayload extends IJoinRequest {}
