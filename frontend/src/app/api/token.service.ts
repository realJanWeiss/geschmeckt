import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const JWT_STORAGE_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string | undefined;
  private storageInstance: Storage | null = null;

  constructor(
    private readonly storage: Storage,
  ) {}

  async init() {
    if (!this.storageInstance) {
      this.storageInstance = await this.storage.create();
      await this.getTokenFromStorage();
    }
  }

  private async getTokenFromStorage(): Promise<string | null> {
    const token = await this.storage.get(JWT_STORAGE_KEY);
    this.token = token === null ? undefined : token;
    return token;
  }

  getToken(): string | undefined {
    return this.token;
  }

  async setToken(token: string): Promise<void> {
    this.token = token;
    await this.storage.set(JWT_STORAGE_KEY, token);
  }

  async removeToken(): Promise<void> {
    this.token = undefined;
    await this.storage.remove(JWT_STORAGE_KEY);
  }
}
