export interface accessTokenPayload {
  id: string;
  email: string;
  username: string;
  roles: string[];
}
export interface refreshTokenPayload {
  id: string;
}
