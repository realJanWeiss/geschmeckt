import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonItemDivider,
  IonImg,
} from '@ionic/angular/standalone';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ModalComponent } from '../ui-library/modal/modal.component';

const possibleImages = [
  'beverage-box',
  'chocolate',
  'cookie',
  'sandwich',
  'spaghetti',
  'stuffed-flatbread',
  'taco',
] as const;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonButton,
    IonItemDivider,
    IonContent,
    CommonModule,
    FormsModule,
    RegistrationFormComponent,
    LoginFormComponent,
    ModalComponent,
  ],
})
export class WelcomePage {
  isLoggingIn = false;
  randomImage: string;

  constructor(private readonly cdr: ChangeDetectorRef) {
    const randomIndex = Math.floor(Math.random() * possibleImages.length);
    this.randomImage = `/assets/${possibleImages[randomIndex]}.svg`;
  }

  closeLoginModal() {
    this.isLoggingIn = false;
    this.cdr.detectChanges();
  }
}
