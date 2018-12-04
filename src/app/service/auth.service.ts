import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserInfo } from 'firebase';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(
    private angularFire: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    this.angularFire.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.snackBar.open('you are logged in ', 'ok', {
          duration: 5000
        });
        this.router.navigate(['/list']);
      })
      .catch(err => {
        console.log(err);
      });
  }
  singup(email: string, password: string) {
    this.angularFire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.login(email, password);
      })
      .catch(err => {
        console.log(err);
      });
  }
  logout() {
    this.angularFire.auth.signOut();
    this.snackBar.open('you are logged out ', 'ok', {
      duration: 5000
    });
  }
}
