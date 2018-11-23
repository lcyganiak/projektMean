import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from '../components/add/add.component';
import { EditComponent } from '../components/edit/edit.component';
import { ListComponent } from '../components/list/list.component';
import { NotfComponent } from '../components/notf/notf.component';
import { DetalComponent } from '../components/detal/detal.component';
import { LoginComponent } from '../components/login/login/login.component';
import { SingupComponent } from '../components/login/singup/singup.component';
import { ActivButtonService } from './ActivButtonService';

const appRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'add', component: AddComponent, canActivate: [ActivButtonService] },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: 'detal/:id', component: DetalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },
  { path: '**', component: NotfComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
