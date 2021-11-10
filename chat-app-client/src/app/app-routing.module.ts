import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './authentication/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./authentication/authentication.module').then(
				(m) => m.AuthenticationModule
			)
	},
	{
		path: 'chat',
		loadChildren: () => import('./chat/chat.module').then((m) => m.ChatModule),
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
