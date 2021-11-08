import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';

import { ChatPanelComponent } from './chat-panel.component';

describe('ChatPanelComponent', () => {
	let component: ChatPanelComponent;
	let fixture: ComponentFixture<ChatPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChatPanelComponent],
			imports: [
				MaterialModule,
				ReactiveFormsModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('handleSendMessage', () => {
		let sendBtn: DebugElement;

		beforeEach(() => {
			sendBtn = fixture.debugElement.query(By.css('#send-message-btn'));
			spyOn(component, 'handleSendMessage');
			sendBtn.nativeElement.click();
			fixture.detectChanges();
		});

		it('should call event handler on click of send message button', () => {
			expect(component.handleSendMessage).toHaveBeenCalled();
		});
	});

	describe('handleSendCommand', () => {
		let commandBtn: DebugElement;

		beforeEach(() => {
			commandBtn = fixture.debugElement.query(By.css('#trigger-command-btn'));
			spyOn(component, 'handleSendCommand');
			commandBtn.nativeElement.click();
		});

		it('should call event handler on click of trigger command button', () => {
			expect(component.handleSendCommand).toHaveBeenCalled();
		});
	});
});
