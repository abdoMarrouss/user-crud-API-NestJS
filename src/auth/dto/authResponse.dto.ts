export class AuthResponseDto{
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  type_token: string;
  not_before_policy: number;
  session_state: number;
  scope: string;
}