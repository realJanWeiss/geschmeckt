import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IonModal,
  IonHeader,
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    IonModal,
    IonHeader,
    IonButton,
    IonButtons,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonContent,
  ],
})
export class ModalComponent {
  @Input() titleText?: string;
  @Input() isOpen!: boolean;
  @Output() isOpenChange = new EventEmitter<boolean>();

  constructor() {
    addIcons({ closeOutline });
  }
}
