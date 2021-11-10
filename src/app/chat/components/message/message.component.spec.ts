import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as moment from 'moment';
import { MaterialModule } from 'src/app/material/material.module';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
	let component: MessageComponent;
	let fixture: ComponentFixture<MessageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MessageComponent],
			imports: [
				BrowserAnimationsModule,
				MaterialModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageComponent);
		component = fixture.componentInstance;
		component.username = 'dominic';
		component.chat = {
			author: 'dominic',
			message: 'Hello',
			timestamp: new Date()
		};

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should convert timestamp to relative time', () => {
		let date = component.chat.timestamp;
		expect(component.toMomentTime(date))
			.toEqual(moment(date).fromNow());
	});
});
