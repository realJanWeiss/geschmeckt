import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from 'src/app/api/auth.service';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonicModule, ReactiveFormsModule],
})
export class LoginFormComponent implements OnInit {
  @Output() passed = new EventEmitter<void>();
  loginForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastController: ToastController,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .login({ email, password })
        .pipe(
          catchError((error) => {
            if (error.status === 400) {
              this.toastController
                .create({
                  message: 'Email or password invalid',
                  position: 'bottom',
                })
                .then((toast) => {
                  toast.present();
                });
            }
            return EMPTY;
          }),
        )
        .subscribe(() => {
          this.passed.emit();
          this.router.navigate(['/home']);
        });
    }
  }
}
