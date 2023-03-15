import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { KeycloakConfigService } from "./KeycloakConfigService";
import { APP_GUARD } from "@nestjs/core";
import { HttpModule } from "@nestjs/axios";
import { AuthGuard, KeycloakConnectModule } from "nest-keycloak-connect";

@Module({
  imports: [
    HttpModule,
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'nest-js',
      clientId: 'nest-client',
      secret: '6TuIPGPKy5DjfTdQtYQpdc6J8UH2EJHy',
      // Secret key of the client taken from keycloak server
    }),
  ],
  providers: [
    // {
    //    provide: APP_GUARD,
    //   useClass: AuthGuard,
    //  },
    AuthService
  ],
  exports: [
  ],
  controllers:[
    AuthController
  ]
})

export class AuthModule {}
