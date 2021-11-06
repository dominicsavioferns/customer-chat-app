import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
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

  @ViewChild('message', { read: ViewContainerRef })
  placeholder!: ViewContainerRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

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
        component.instance.author = commandResponse.author;
        component.instance.actions = commandResponse.command.data as [
          string,
          string
        ];
        component.instance.onAction.subscribe((action) => {
          this.handleCompleteEvent(action);
        });
        break;
      case CommandType.DATE:
        component = this.placeholder.createComponent(DateComponent);
        component.instance.minDate = new Date(
          commandResponse.command.data as string
        );
        component.instance.onDateSelected.subscribe((date) => {
          this.handleDateEvent(date);
        });
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

  private handleCompleteEvent(action: string): void {
    switch (action) {
      case 'Yes':
        this.authService.logout().subscribe((_) => {
          this.router.navigate(['/login']);
        });
        break;
      case 'No':
        break; // do something
      default:
        throw new Error('Invalid action');
    }
  }

  private handleDateEvent(date: string): void {
    console.log(date);
  }
}
