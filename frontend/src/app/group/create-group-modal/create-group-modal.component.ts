import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from 'src/app/ui-library/modal/modal.component';
import { IonButton, IonGrid, IonRow, IonCol, IonInput } from '@ionic/angular/standalone'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupsService } from 'src/api-client';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
  imports: [ModalComponent, IonButton, IonGrid, IonRow, IonCol, IonInput, ReactiveFormsModule],
})
export class CreateGroupModalComponent  implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  groupCreationForm!: FormGroup;

  constructor(private readonly groupsService: GroupsService) { }

  ngOnInit() {
    this.groupCreationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.groupCreationForm.valid) {
      const { name } = this.groupCreationForm.value;
      this.groupsService.groupsControllerCreate({ name }).subscribe(() => {
        this.isOpenChange.emit(false);
       });
    }
  }
}