import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AddComponent } from '../components/add/add.component';
import { DeleteComponent } from '../components/delete/delete.component';
import { EditComponent } from '../components/edit/edit.component';
import { ListComponent } from '../components/list/list.component';
import { NotfComponent } from '../components/notf/notf.component';
import { DetalComponent } from '../components/detal/detal.component';


const appRoutes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'add', component: AddComponent},
{path: 'delete', component: DeleteComponent},
{path: 'edit/:id', component: EditComponent},
{path: 'list', component: ListComponent
},
{path: 'detal/:id', component: DetalComponent},
{path: '**', component: NotfComponent}





];
@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})
export class AppRoutingModule {

}
