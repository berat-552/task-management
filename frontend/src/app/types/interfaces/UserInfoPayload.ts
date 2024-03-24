export interface UserInfoPayload {
  status: number;
  user: {
    user: {
      username: string;
      email: string;
      userId: string;
    };
    iat: number;
    exp: number;
  };
}
