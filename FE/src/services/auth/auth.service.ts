import { apiClient } from "@/lib/axios";
import {
  ISignInRequest,
  ISignUpRequest,
  ITokenResponse,
} from "@/services/auth/auth.type";
import { IResponse } from "@/types/api.type";

export const authService = {
  login: (payload: ISignInRequest): Promise<IResponse<ITokenResponse>> =>
    apiClient.post("/auth/login", payload),

  signUp: (payload: ISignUpRequest): Promise<void> =>
    apiClient.post("/auth/signup", payload),
};
