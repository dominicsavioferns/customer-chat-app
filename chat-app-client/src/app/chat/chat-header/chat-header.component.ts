import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ott-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent implements OnInit {
  @Output() onLogout!: EventEmitter<boolean>;
  constructor() {
    this.onLogout = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  public handleLogout(): void {
    this.onLogout.emit(true);
  }
}
