import { Component, OnInit, signal } from '@angular/core';
import { IonModal, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonListHeader, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, exitOutline, personAddOutline } from 'ionicons/icons';
import { CreateGroupModalComponent } from "./create-group-modal/create-group-modal.component";
import { GroupService } from '../api/group.service';
import { GroupResponseDTO } from 'src/api-client';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
  imports: [IonModal, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonListHeader, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, CreateGroupModalComponent]
})
export class GroupPage implements OnInit {
  isCreatingGroup = false;
  showingGroup = signal<GroupResponseDTO | undefined>(undefined);

  constructor(readonly groupService: GroupService) {
    addIcons({ addOutline, personAddOutline, exitOutline });
  }

  ngOnInit(): void {
      this.groupService.fetchGroups().subscribe();
  }

  createGroup() {
    this.isCreatingGroup = true;
  }

  setShowingGroup(group: GroupResponseDTO | undefined) {
    this.showingGroup.set(group);
  }
}
