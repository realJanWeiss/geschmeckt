import { Injectable, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, map, mergeMap, Observable, tap } from 'rxjs';
import { AuthenticationService, Configuration, LoginRequestDTO, UserRequestDTO, UserResponseDTO } from 'src/api-client';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly user = signal<any>(undefined);

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly tokenService: TokenService,
  ) {}

  isLoggedIn(): boolean {
    return Boolean(this.tokenService.getToken());
  }

  public registerUser(userRequestDTO: UserRequestDTO): Observable<string> {
    return this.authenticationService.authenticationControllerRegister(userRequestDTO).pipe(
      tap((jwt) => {
        this.tokenService.setToken(jwt);
      })
    );
  }

  public login(loginRequestDTO: LoginRequestDTO): Observable<string> {
    return this.authenticationService.authenticationControllerLogin(loginRequestDTO).pipe(
      tap((jwt) => {
        this.tokenService.setToken(jwt);
      })
    );
  }

  public logout(): Observable<void> {
    return this.authenticationService.authenticationControllerLogout().pipe(
      mergeMap(() => {
        return this.tokenService.removeToken();
      })
    );
  }

  public fetchUser(): Observable<UserResponseDTO> {
    return this.authenticationService.authenticationControllerGetCurrentUser().pipe(
      tap((user) => {
        this.user.set(user);
        return user;
      })
    );
  }
}
