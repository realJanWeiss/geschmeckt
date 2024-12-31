import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { Configuration } from './api-client';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
  importProvidersFrom,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { Drivers } from '@ionic/storage';
import { TokenService } from './app/api/token.service';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => {
      const tokenService = inject(TokenService);
      return tokenService.init();
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    {
      provide: Configuration,
      useFactory: (tokenService: TokenService) =>
        new Configuration({
          basePath: environment.baseUrlApi,
          credentials: {
            bearer: tokenService.getToken.bind(tokenService),
          },
        }),
      deps: [TokenService],
    },
    importProvidersFrom(
      IonicStorageModule.forRoot({
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      }),
    ),
  ],
});
