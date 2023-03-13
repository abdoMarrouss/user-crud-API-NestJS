import { Injectable } from "@nestjs/common";
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';


@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory{

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'nest-js',
      clientId: 'nest-client',
      secret: '6TuIPGPKy5DjfTdQtYQpdc6J8UH2EJHy',
      logLevels: ['verbose'],
      useNestLogger: true,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }

}