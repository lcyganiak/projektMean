import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule,
   MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { DeleteComponent } from './components/delete/delete.component';
import { EditComponent } from './components/edit/edit.component';
import { NotfComponent } from './components/notf/notf.component';
import { AppRoutingModule } from './service/app.router.modules';
import { IssueService } from './service/issue.service';
import { DetalComponent } from './components/detal/detal.component';
import { SortNamePipe } from './pipe/sortNane/sort-name.pipe';
import { FilterPipe } from './pipe/filtr/filter.pipe';
import { TextTransformPipe } from './pipe/text-transform/text-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    NotfComponent,
    DetalComponent,
    SortNamePipe,
    FilterPipe,
    TextTransformPipe,

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
     ReactiveFormsModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
