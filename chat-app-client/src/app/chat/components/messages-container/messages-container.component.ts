import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { first, Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CommandType } from '../../chat.enum';
import { ChatService } from '../../chat.service';
import { CommandResponse, GeoCoords } from '../../interfaces/command.interface';
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
export class MessagesContainerComponent implements OnInit, OnDestroy {
  @Input() user!: string | null;

  @ViewChild('message', { read: ViewContainerRef })
  placeholder!: ViewContainerRef;

  private customerCommands: any = {};
  private completeWidgetsList!: ComponentRef<CompleteComponent>[];
  private dateWidgetsList!: ComponentRef<DateComponent>[];
  private rateWidgetsList!: ComponentRef<RateComponent>[];

  /**
   * stores all subscriptions of the component
   */
  private subscriptions: Subscription;

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.completeWidgetsList = [];
    this.dateWidgetsList = [];
    this.rateWidgetsList = [];
    this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    // unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.insertDynamicComponent();
  }

  /**
   * @description method to subscribe to socket events
   * listens for messages and commands and handles each event types
   */
  private insertDynamicComponent(): void {
    /**
     * subscribe to command events
     */
    const commandSubsScription = this.chatService.command$.subscribe(
      (command) => {
        console.log(command);
        this.loadWidgetByCommandType(command);
      }
    );

    /**
     * subscribe to message events
     * create a new message component and set its state values
     * append component to the DOM
     */
    const messageSubscription = this.chatService.message$.subscribe(
      (message) => {
        console.log(message);
        const component = this.placeholder.createComponent(MessageComponent);
        component.instance.username = this.user;
        component.instance.chat = message;
      }
    );

    /**
     * add both events to subscription list
     */
    this.subscriptions.add(commandSubsScription);
    this.subscriptions.add(messageSubscription);
  }

  /**
   * @description method to check what command was sent from the sever
   * renders widget according to the type of the command
   * @param {CommandResponse} commandResponse - response from server when command is triggered
   */
  private loadWidgetByCommandType(commandResponse: CommandResponse): void {
    let component;
    switch (commandResponse.command.type) {
      // render complete widget
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
        this.completeWidgetsList.push(component);
        break;

      // render date
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
        this.dateWidgetsList.push(component);
        break;

      // render rating widget
      case CommandType.RATE:
        component = this.placeholder.createComponent(RateComponent);
        component.instance.author = commandResponse.author;
        component.instance.maxStars = (
          commandResponse.command.data as [number, number]
        )[1];
        component.instance.selectedRating = this.customerCommands[
          CommandType.RATE
        ]
          ? this.customerCommands[CommandType.RATE]
          : 0;
        component.instance.user = this.authService.username;
        component.instance.onRating.pipe(first()).subscribe((rating) => {
          this.handleRating(rating);
        });
        this.rateWidgetsList.push(component);
        break;

      // render map widget
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

  /**
   * @description event handler when use selects action from complete widget
   * destroy all previous complete widgets from the chat
   * @param day - user action to close conversation
   */
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
    this.completeWidgetsList.pop();
    this.completeWidgetsList.map((widget) => {
      widget.destroy();
    });
    this.completeWidgetsList = [];
    this.sendMessageOnCommandResponseEvent(action);
  }

  /**
   * @description event handler when use selects day from the date widget
   * destroy all previous date widgets from the chat
   * @param day - appointment day
   */
  private handleDateEvent(day: string): void {
    console.log(day);
    this.customerCommands[CommandType.DATE] = day;
    console.log(this.customerCommands);
    this.dateWidgetsList.pop();
    this.dateWidgetsList.map((widget) => {
      widget.destroy();
    });
    this.dateWidgetsList = [];
    this.sendMessageOnCommandResponseEvent(day);
  }

  /**
   * @description event handler when the user provides input for
   * conversation rating widgets
   * destroy all previous rating widgets from the chat
   * @param {number} rating conversation rating
   */
  private handleRating(rating: number): void {
    this.customerCommands[CommandType.RATE] = rating;
    console.log(this.rateWidgetsList);
    this.rateWidgetsList.pop();
    this.rateWidgetsList.map((widget) => {
      widget.destroy();
    });
    this.rateWidgetsList = [];
    this.sendMessageOnCommandResponseEvent(rating.toString());
  }

  /**
   * @description sends the sever the response of the user
   * @param {string} response - response of the user from the widget
   */
  private sendMessageOnCommandResponseEvent(response: string): void {
    this.chatService.sendMessage({
      author: this.authService.username,
      message: response,
    });
  }
}
