import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './authentication/guards/auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

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
	},
	{
		path: 'error/404',
		component: ErrorPageComponent
	},
	{
		path: '**',
		redirectTo: '/error/404',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
