import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { lastValueFrom } from "rxjs";
import { UserCredentialsDto } from "../dto/userCredentials.dto";


@Injectable()
export class AuthService {

  constructor( private http: HttpService) { }

  async authenticate(credentials: UserCredentialsDto): Promise<any>{
    try{

      const response = await lastValueFrom(this.http.post(
          'http://localhost:8080/auth/realms/nest-js/protocol/openid-connect/token',
          {
            grant_type: 'password',
            client_id: 'nest-client',
            client_secret:'6TuIPGPKy5DjfTdQtYQpdc6J8UH2EJHy',
            username: credentials.username,
            password: credentials.password,
          },
          {
            headers:{
              "Content-Type":"application/x-www-form-urlencoded"
            }
          }
        )
      );
      return response.data;
    }catch(error){
      console.log(error);
      if(error.code=='ERR_BAD_REQUEST'){
        throw new HttpException("bad credentials",HttpStatus.BAD_REQUEST)
      }
      else{
        throw new HttpException("error",HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }















  async refreshToken(refresToken: string){
    try{
      const response= await lastValueFrom(
        this.http.post(
          'https://localhost:8080/auth/realms/nest-js/protocol/openid-connect/token',
          {
            grant_type: 'refresh_token',
            client_id: 'nest-client',
            client_secret:'6TuIPGPKy5DjfTdQtYQpdc6J8UH2EJHy',
            refresh_token: refresToken
          },
          {
            headers:{
              "Content-Type":"application/x-www-form-urlencoded"
            }
          }
        )
      );
      return response.data;
    }catch(error){
      if(error.code='ERR_BAD_REQUEST'){
        throw new HttpException("refresh token not valid",HttpStatus.BAD_REQUEST);
      }
      else{
        throw new HttpException("error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}