import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ){
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required], Validators.minLength(6)]
      });
    }

    logIn(){
      if(this.loginForm?.valid){
        const user = {
            username: this.loginForm.value.username,
            password: this.loginForm.value.password
        }
        this.authService.login(user).subscribe({
          next: (res) => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = 'Invalid Credentials';
          }
        })
      }
      else{
        console.log("Fill all fields")
      }
    }
    
}
