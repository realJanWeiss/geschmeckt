import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItemDivider, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/angular/standalone';
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonTitle, IonButtons, IonToolbar, IonHeader, IonModal, IonButton, IonItemDivider, IonContent, CommonModule, FormsModule, RegistrationFormComponent, LoginFormComponent]
})
export class WelcomePage {
  // @ts-ignore
  @ViewChild(IonModal) modal: IonModal;

  constructor() { }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
