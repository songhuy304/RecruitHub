import { apiClient } from "@/lib/axios";
import {
  ISignInRequest,
  ISignUpRequest,
  ITokenResponse,
  IVerifyTokenRequest,
} from "@/services/auth/auth.type";
import { IApiBaseResponse, IResponse } from "@/types/api.type";

export const authService = {
  signIn: (payload: ISignInRequest): Promise<IResponse<ITokenResponse>> =>
    apiClient.post("/auth/login", payload),

  signUp: (payload: ISignUpRequest): Promise<IApiBaseResponse> =>
    apiClient.post("/auth/signup", payload),

  verifyToken: (
    payload: IVerifyTokenRequest,
  ): Promise<IResponse<ITokenResponse>> =>
    apiClient.post("/auth/verify", payload),
};
