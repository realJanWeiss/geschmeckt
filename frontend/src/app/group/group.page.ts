import { Component, OnInit, signal } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, searchOutline } from 'ionicons/icons';
import { CreateGroupModalComponent } from './create-group-modal/create-group-modal.component';
import { GroupService } from '../api/group.service';
import { GroupResponseDTO } from 'src/api-client';
import { RouterModule } from '@angular/router';
import { GroupFindFormComponent } from './group-find-form/group-find-form.component';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
  imports: [
    RouterModule,
    IonButton,
    IonIcon,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CreateGroupModalComponent,
    GroupFindFormComponent,
  ],
})
export class GroupPage implements OnInit {
  isCreatingGroup = false;
  showingGroup = signal<GroupResponseDTO | undefined>(undefined);
  showingFindGroup = false;

  constructor(readonly groupService: GroupService) {
    addIcons({ addOutline, searchOutline });
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
