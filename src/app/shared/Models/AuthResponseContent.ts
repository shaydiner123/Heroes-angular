export interface AuthResponseContent {
  user: UserApiResponse;
  token: Token;
}

interface Token {
  tokenValue: string;
  expiresIn: string;
}

interface UserApiResponse {
  id: any;
  username: string;
  Email?: string;
}
