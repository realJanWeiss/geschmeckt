import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rate',
  templateUrl: 'rate.page.html',
  styleUrls: ['rate.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class RatePage {
  constructor() {}
}
