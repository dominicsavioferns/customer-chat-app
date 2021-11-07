import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
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

  private customerCommands: any = {};

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
        component.instance.action = this.customerCommands[CommandType.COMPLETE];
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
        component.instance.author = commandResponse.author;
        component.instance.user = this.authService.username;
        component.instance.selectedDay =
          this.customerCommands[CommandType.DATE];
        component.instance.minDate = new Date(
          commandResponse.command.data as string
        );
        component.instance.onDaySelected.subscribe((date) => {
          this.handleDateEvent(date);
        });
        break;

      case CommandType.RATE:
        component = this.placeholder.createComponent(RateComponent);
        component.instance.author = commandResponse.author;
        component.instance.selectedRating = this.customerCommands[
          CommandType.RATE
        ]
          ? this.customerCommands[CommandType.RATE]
          : 0;
        component.instance.user = this.authService.username;
        component.instance.onRating.pipe(first()).subscribe((rating) => {
          this.handleRating(rating);
        });
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
    this.customerCommands[CommandType.COMPLETE] = action;
    console.log(this.customerCommands);
    switch (action) {
      case 'Yes':
        // this.authService.logout().subscribe((_) => {
        //     this.router.navigate(['/login']);
        // });
        break;
      case 'No':
        break; // do something
      default:
        throw new Error('Invalid action');
    }
    this.sendMessageOnCommandResponseEvent(action);
  }

  private handleDateEvent(day: string): void {
    console.log(day);
    this.customerCommands[CommandType.DATE] = day;
    console.log(this.customerCommands);

    this.sendMessageOnCommandResponseEvent(day);
  }

  private handleRating(rating: number): void {
    this.customerCommands[CommandType.RATE] = rating;
    console.log(this.customerCommands);

    this.sendMessageOnCommandResponseEvent(rating.toString());
  }

  private sendMessageOnCommandResponseEvent(response: string): void {
    this.chatService.sendMessage({
      author: this.authService.username,
      message: response,
    });
  }
}
