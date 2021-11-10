import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatContainerComponent } from './pages/chat-container/chat-container.component';
import { ResponsesComponent } from './pages/responses/responses.component';

const routes: Routes = [
	{ path: '', component: ChatContainerComponent },
	{ path: 'responses', component: ResponsesComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ChatRoutingModule { }
