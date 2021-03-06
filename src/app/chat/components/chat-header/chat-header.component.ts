import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'ott-chat-header',
	templateUrl: './chat-header.component.html',
	styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent implements OnInit {
	@Output() onLogout!: EventEmitter<boolean>;
	@Output() onClose!: EventEmitter<boolean>;

	constructor() {
		this.onLogout = new EventEmitter<boolean>();
		this.onClose = new EventEmitter<boolean>();
	}

	ngOnInit(): void { }

	/**
	 * @description handles the click when user logs out
	 */
	public handleLogout(): void {
		this.onLogout.emit(true);
	}

	/**
	 * emit close chat event
	 */
	public handleClose(): void {
		this.onClose.emit(true);
	}
}
