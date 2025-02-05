import { Share } from '@capacitor/share';
import { Component, computed, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { GroupResponseDTO, GroupsService } from 'src/api-client';
import { GroupService } from '../api/group.service';
import { addIcons } from 'ionicons';
import { exitOutline, personAddOutline } from 'ionicons/icons';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonIcon,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class GroupDetailPage implements OnInit {
  private groupId!: string;
  group = signal<GroupResponseDTO | undefined>(undefined);
  fetchError = signal<number | undefined>(undefined);
  isMember: Signal<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly groupsService: GroupsService,
    private readonly groupService: GroupService,
    private readonly alertController: AlertController,
  ) {
    addIcons({ personAddOutline, exitOutline });
    this.isMember = computed(() => {
      if (this.groupService.fetching() || !this.group()) return false;
      return this.groupService
        .groups()
        .some((group) => group.id === this.group()?.id);
    });
  }

  ngOnInit() {
    this.groupService.fetchGroups().subscribe();
    this.groupId = this.route.snapshot.paramMap.get('id') as string;
    this.groupsService
      .groupsControllerGetGroupById(this.groupId)
      .pipe(
        catchError((error) => {
          this.fetchError.set(error.status);
          return EMPTY;
        }),
      )
      .subscribe((group) => {
        this.group.set(group);
      });
  }

  async invite() {
    await Share.share({
      title: 'Join my Geschmeckt group',
      text:
        "Let's share which groceries we like best!" +
        `\n\nGroup access: ${this.groupId}`,
    });
  }

  joinGroup() {
    this.groupService
      .joinGroup(this.groupId)
      .subscribe(this.groupUpdate.bind(this));
  }

  async requestLeaveGroup() {
    const confirmation = await this.alertController.create({
      header: 'Leave Group',
      message: `Are you sure that you want to leave the Group "${this.group()!.name}"`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Leave',
          role: 'destructive',
          handler: this.leaveGroup.bind(this),
        },
      ],
    });
    await confirmation.present();
  }

  private leaveGroup() {
    this.groupService
      .leaveGroup(this.groupId)
      .subscribe(this.groupUpdate.bind(this));
  }

  private groupUpdate(newGroup: GroupResponseDTO) {
    this.group.set(newGroup);
  }
}
