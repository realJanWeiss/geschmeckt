import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-group-find-form',
  templateUrl: './group-find-form.component.html',
  styleUrls: ['./group-find-form.component.scss'],
  imports: [IonButton, IonIcon, IonInput, ReactiveFormsModule],
})
export class GroupFindFormComponent implements OnInit {
  groupFindForm!: FormGroup;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.groupFindForm = new FormGroup({
      secret: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        ),
      ]),
    });
  }

  onSubmit() {
    if (this.groupFindForm.valid) {
      const { secret } = this.groupFindForm.value;
      this.router.navigate([`/home/group/${secret}`]);
    }
  }
}
