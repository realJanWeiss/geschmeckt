import { Component, OnInit } from '@angular/core';
import {
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { exitOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class ProfilePage implements OnInit {
  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
  ) {
    addIcons({ exitOutline });
  }

  ngOnInit() {
    this.authService.fetchUser().subscribe();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
