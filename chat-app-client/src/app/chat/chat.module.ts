import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MessagesContainerComponent } from './messages-container/messages-container.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { MaterialModule } from '../material/material.module';
import { MessageComponent } from './message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './widgets/complete/complete.component';
import { RateComponent } from './widgets/rate/rate.component';
import { DateComponent } from './widgets/date/date.component';
import { MapComponent } from './widgets/map/map.component';
import { ChangeDirectiveDirective } from './directives/change-directive.directive';

@NgModule({
  declarations: [
    ChatContainerComponent,
    MessagesContainerComponent,
    SidebarComponent,
    ChatPanelComponent,
    MessageComponent,
    CompleteComponent,
    RateComponent,
    DateComponent,
    MapComponent,
    ChangeDirectiveDirective,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
