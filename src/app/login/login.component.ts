import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  };

  printValues(): void {
    console.log('Username', this.username);
    console.log('Password', this.password);
  }

  
  onSubmit(): void {

    

    if(this.loginForm.valid) {
      
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.authenticate(username, password).subscribe({
        next: (user) => {
          if(user) {
            sessionStorage.setItem('userId', user.id.toString());
            this.router.navigate(['/clienti']);
          } else {
            alert('Credenziali non valide');
          }
        },
        error: (err) => {
          console.error('Errore del server', err);
        }
      });
    }
  
  }




}
