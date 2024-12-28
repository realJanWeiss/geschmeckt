import { Component, ViewChild } from '@angular/core';
import { IonButton, IonIcon, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, personAddOutline } from 'ionicons/icons';
import { GroupResponseDTO } from 'src/api-client';
import { CreateGroupModalComponent } from "./create-group-modal/create-group-modal.component";

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
  imports: [IonButton, IonIcon, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, CreateGroupModalComponent]
})
export class GroupPage {
  groups: GroupResponseDTO[] = [];
  isCreatingGroup = false;

  constructor() {
    addIcons({ addOutline, personAddOutline });
  }

  createGroup() {
    this.isCreatingGroup = true;
  }
}
