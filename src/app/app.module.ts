import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { NotfComponent } from './components/notf/notf.component';
import { AppRoutingModule } from './service/app.router.modules';
import { IssueService } from './service/issue.service';
import { DetalComponent } from './components/detal/detal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DescriptionListPipe } from './pipe/description/description-list.pipe';
import { UpperCasePipe } from './pipe/UpperCase/upper-case.pipe';
import { LoginComponent } from './components/login/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './service/auth.service';
import { SingupComponent } from './components/login/singup/singup.component';
import { ActivButtonService } from './service/ActivButtonService';
import { ContenteditableDirective } from './directiv/userChangeStyle/contenteditable.directive';

const config = {
  apiKey: 'AIzaSyBrjJKnRsQolyHL-6-yrqVzBs101gO1lYk',
  authDomain: 'authtest-2b6db.firebaseapp.com',
  databaseURL: 'https://authtest-2b6db.firebaseio.com',
  projectId: 'authtest-2b6db',
  storageBucket: 'authtest-2b6db.appspot.com',
  messagingSenderId: '650260537387'
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    NotfComponent,
    DetalComponent,
    DescriptionListPipe,
    UpperCasePipe,
    LoginComponent,
    SingupComponent,
    ContenteditableDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [IssueService, AuthService, ActivButtonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
