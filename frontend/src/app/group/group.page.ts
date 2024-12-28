import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, personAddOutline } from 'ionicons/icons';
import { CreateGroupModalComponent } from "./create-group-modal/create-group-modal.component";
import { GroupService } from '../api/group.service';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
  imports: [IonButton, IonIcon, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, CreateGroupModalComponent]
})
export class GroupPage implements OnInit {
  isCreatingGroup = false;

  constructor(readonly groupService: GroupService) {
    addIcons({ addOutline, personAddOutline });
  }

  ngOnInit(): void {
      this.groupService.fetchGroups().subscribe();
  }

  createGroup() {
    this.isCreatingGroup = true;
  }
}
