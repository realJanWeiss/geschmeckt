import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,],
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  async ngOnInit(): Promise<void> {
      await this.authService.init();
  }
}
