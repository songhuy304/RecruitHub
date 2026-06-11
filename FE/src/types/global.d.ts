export {};

declare global {
  interface User {
    id: number;
    userName: string;
    email: string;
    fullName: string;
    avatar: string;
    role: string;
    isVerified: boolean;
    teamId: number;
    teamRole: string;
  }
}
