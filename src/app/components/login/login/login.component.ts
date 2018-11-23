import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  info: string;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.info = 'Zaloguj się, abyś mógł dodac ksiązke ' + params['name'];
      } else {
        this.info = null;
      }
    });
  }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
  }
}
