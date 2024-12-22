import { Injectable, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, tap } from 'rxjs';
import { AuthenticationService, LoginRequestDTO, UserRequestDTO, UserResponseDTO } from 'src/api-client';

const JWT_STORAGE_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly user = signal<any>(undefined);
  private storageInstance: Storage | null = null;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly storage: Storage
  ) {}

  async init() {
    if (!this.storageInstance) {
      this.storageInstance = await this.storage.create();
      await this.storage.get(JWT_STORAGE_KEY);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    await this.init();
    const token = await this.storage.get(JWT_STORAGE_KEY);
    return token !== null;
  }

  public registerUser(userRequestDTO: UserRequestDTO): Observable<string> {
    return this.authenticationService.authenticationControllerRegister(userRequestDTO).pipe(
      tap((jwt) => {
        this.storage.set(JWT_STORAGE_KEY, jwt);
      })
    );
  }

  public login(loginRequestDTO: LoginRequestDTO) {
    return this.authenticationService.authenticationControllerLogin(loginRequestDTO).pipe(
      tap((jwt) => {
        this.storage.set(JWT_STORAGE_KEY, jwt);
      })
    );
  }

  public fetchUser(): Observable<UserResponseDTO> {
    // TODO set jwt in header
    return this.authenticationService.authenticationControllerGetCurrentUser().pipe(
      tap((user) => {
        this.user.set(user)
      })
    );
  }
}
