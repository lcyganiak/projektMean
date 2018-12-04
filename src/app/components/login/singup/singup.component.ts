import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
  signup(formSingup: NgForm) {
    this.authService.singup(formSingup.value.email, formSingup.value.password);
  }
}
