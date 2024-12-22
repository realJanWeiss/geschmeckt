import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService, LoginRequestDTO, UserRequestDTO } from 'src/api-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly authenticationService: AuthenticationService) { }

  public registerUser(userRequestDTO: UserRequestDTO): Observable<string> {
    return this.authenticationService.authenticationControllerRegister(userRequestDTO);
  }

  public login(loginRequestDTO: LoginRequestDTO) {
    return this.authenticationService.authenticationControllerLogin(loginRequestDTO);
  }

}
