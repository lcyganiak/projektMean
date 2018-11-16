import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
  }
  // signup(formData: NgForm) {
  //   this.authService.singup(formData.value.email, formData.value.password);
  // }
}
