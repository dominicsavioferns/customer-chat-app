import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommandType } from '../chat.enum';
import { ChatService } from '../chat.service';
import { CommandResponse, GeoCoords } from '../interfaces/command.interface';
import { MessageComponent } from '../message/message.component';
import { CompleteComponent } from '../widgets/complete/complete.component';
import { DateComponent } from '../widgets/date/date.component';
import { MapComponent } from '../widgets/map/map.component';
import { RateComponent } from '../widgets/rate/rate.component';

@Component({
  selector: 'ott-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss'],
})
export class MessagesContainerComponent implements OnInit {
  @Input() user!: string;

  @ViewChild('element', { read: ViewContainerRef })
  placeholder!: ViewContainerRef;

  @ViewChild('messages') private messagesWrapper!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.insertDynamicComponent();
  }

  private insertDynamicComponent(): void {
    this.chatService.receiveCommand().subscribe((command) => {
      console.log(command);
      this.loadWidgetByCommandType(command);
    });

    this.chatService.receiveNewMessage().subscribe((message) => {
      console.log(message);
      const component = this.placeholder.createComponent(MessageComponent);
      component.instance.username = this.user;
      component.instance.chat = message;
    });
  }

  private loadWidgetByCommandType(commandResponse: CommandResponse): void {
    let component;
    switch (commandResponse.command.type) {
      case CommandType.COMPLETE:
        component = this.placeholder.createComponent(CompleteComponent);
        break;
      case CommandType.DATE:
        component = this.placeholder.createComponent(DateComponent);
        break;
      case CommandType.RATE:
        component = this.placeholder.createComponent(RateComponent);
        break;
      case CommandType.MAP:
        component = this.placeholder.createComponent(MapComponent);
        component.instance.height = 400;
        component.instance.width = 450;

        let data = commandResponse.command.data as GeoCoords;
        component.instance.latitude = data.lat;
        component.instance.longitude = data.lng;
        component.instance.author = commandResponse.author;
        break;
      default:
        throw new Error('Invalid commandType');
    }
  }
}
