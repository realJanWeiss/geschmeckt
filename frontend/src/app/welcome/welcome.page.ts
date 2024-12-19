import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItemDivider } from '@ionic/angular/standalone';
import { RegistrationFormComponent } from "./registration-form/registration-form.component";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonButton, IonItemDivider, IonContent, CommonModule, FormsModule, RegistrationFormComponent]
})
export class WelcomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
