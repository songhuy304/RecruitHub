export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ISignInRequest {
  username: string;
  password: string;
}

export interface ISignUpRequest {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}
