import { Injectable, signal } from '@angular/core';
import { catchError, EMPTY, finalize, from, map, Observable, tap } from 'rxjs';
import {
  AuthenticationService,
  LoginRequestDTO,
  RegisterResponseDTO,
  UserRequestDTO,
  UserResponseDTO,
} from 'src/api-client';
import { TokenService } from './token.service';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user = signal<UserResponseDTO | undefined>(undefined);

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly tokenService: TokenService,
  ) {}

  isLoggedIn(): boolean {
    return Boolean(this.tokenService.getToken());
  }

  public registerUser(
    userRequestDTO: UserRequestDTO,
  ): Observable<RegisterResponseDTO> {
    return this.authenticationService
      .authenticationControllerRegister(userRequestDTO)
      .pipe(
        tap((registerResponseDTO) => {
          this.tokenService.setToken(registerResponseDTO.jwt);
          this.user.set(registerResponseDTO.user);
        }),
      );
  }

  public login(loginRequestDTO: LoginRequestDTO): Observable<string> {
    return this.authenticationService
      .authenticationControllerLogin(loginRequestDTO)
      .pipe(
        tap((jwt) => {
          this.tokenService.setToken(jwt);
        }),
      );
  }

  public logout(): Observable<void> {
    return this.authenticationService.authenticationControllerLogout().pipe(
      catchError((error) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          return EMPTY;
        } else {
          throw error;
        }
      }),
      map(() => undefined),
      finalize(() => {
        return from(this.tokenService.removeToken());
      }),
    );
  }

  public fetchUser(): Observable<UserResponseDTO> {
    return this.authenticationService
      .authenticationControllerGetCurrentUser()
      .pipe(
        tap((user) => {
          this.user.set(user);
          return user;
        }),
      );
  }
}
