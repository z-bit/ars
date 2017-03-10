import { Routes, RouterModule } from '@angular/router';
import { JustReduxComponent } from './just-redux/just-redux.component';

const routes: Routes = [
	{path: '', component: JustReduxComponent},
	
];
export const JustReduxRouting = RouterModule.forChild(routes);

