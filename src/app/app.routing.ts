import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
	
const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'just', loadChildren: './just-redux/just-redux.module#JustReduxModule'},

];
export const AppRouting = RouterModule.forRoot(routes);