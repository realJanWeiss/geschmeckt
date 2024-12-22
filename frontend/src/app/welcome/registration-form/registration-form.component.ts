import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  imports: [IonicModule, ReactiveFormsModule]
})
export class RegistrationFormComponent implements OnInit {
  // @ts-ignore
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private readonly navCtrl: NavController) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), this.checkPassword]),
    });
  }

  checkPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value
    const lowerCase = (password.match(/[a-z]/) || []).length;
    const upperCase = (password.match(/[A-Z]/) || []).length;
    const numbers = (password.match(/\d/) || []).length;
    const specialCharacters = password.length - lowerCase - upperCase - numbers;

    const result = {
      failedLowerCase: lowerCase === 0,
      failedUpperCase: upperCase === 0,
      failedNumbers: numbers === 0,
      failedSpecialCharacters: specialCharacters === 0,
    }
    return (Object.values(result).includes(true))
      ? result
      : null;
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const { name, email, password } = this.registrationForm.value;
      this.authService.registerUser({ name, email, password }).subscribe((res) => {
        console.log(res);
        this.navCtrl.navigateForward('/home');
      });

    } else {
      console.log('Form is invalid');
    }
  }
}
