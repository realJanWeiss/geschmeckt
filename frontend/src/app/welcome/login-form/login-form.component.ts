import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonicModule, ReactiveFormsModule]
})
export class LoginFormComponent  implements OnInit {
  // @ts-ignore
  loginForm: FormGroup;

  constructor(private readonly authService: AuthService, private readonly navCtrl: NavController) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe((res) => {
        console.log(res);
        this.navCtrl.navigateForward('/home');
      });

    } else {
      console.log('Form is invalid');
    }
  }
}
