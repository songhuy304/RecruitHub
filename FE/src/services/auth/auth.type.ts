export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInRequest {
  userName: string;
  password: string;
}

export interface ISignUpRequest {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}
