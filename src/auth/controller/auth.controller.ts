import { Body, Controller, Post, UseFilters } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Public, Unprotected } from "nest-keycloak-connect";
import { using } from "rxjs";


@Controller()
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post("login")
  @Unprotected()
  async login(@Body() credentials: { username: string, password: string }) {
    return await this.authService.authenticate(credentials);
  }












  @Public()
  @Post("refresh")
  async getAccesstokenFromRefreshToken(@Body() refreshToken: { refreshToken: string }) {
    return await this.authService.refreshToken(refreshToken.refreshToken);
  }
}