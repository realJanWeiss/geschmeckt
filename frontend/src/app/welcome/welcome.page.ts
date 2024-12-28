import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItemDivider } from '@ionic/angular/standalone';
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { ModalComponent } from "../ui-library/modal/modal.component";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonButton, IonItemDivider, IonContent, CommonModule, FormsModule, RegistrationFormComponent, LoginFormComponent, ModalComponent]
})
export class WelcomePage {
  isLoggingIn = false;

  constructor(private readonly cdr: ChangeDetectorRef) { }

  closeLoginModal() {
    this.isLoggingIn = false;
    this.cdr.detectChanges();
  }
}
