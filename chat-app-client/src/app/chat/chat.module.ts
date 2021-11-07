import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MessagesContainerComponent } from './components/messages-container/messages-container.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { MaterialModule } from '../material/material.module';
import { MessageComponent } from './components/message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './components/widgets/complete/complete.component';
import { RateComponent } from './components/widgets/rate/rate.component';
import { DateComponent } from './components/widgets/date/date.component';
import { MapComponent } from './components/widgets/map/map.component';
import { ScrollBottomDirective } from './directives/scroll-bottom-directive.directive';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';

@NgModule({
  declarations: [
    ChatContainerComponent,
    MessagesContainerComponent,
    ChatPanelComponent,
    MessageComponent,
    CompleteComponent,
    RateComponent,
    DateComponent,
    MapComponent,
    ScrollBottomDirective,
    ChatHeaderComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule {}
