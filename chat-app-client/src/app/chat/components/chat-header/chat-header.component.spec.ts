import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material/material.module';

import { ChatHeaderComponent } from './chat-header.component';

describe('ChatHeaderComponent', () => {
	let component: ChatHeaderComponent;
	let fixture: ComponentFixture<ChatHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChatHeaderComponent],
			imports: [MaterialModule]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ChatHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should trigger logout event on click of logout button', () => {
		spyOn(component, 'handleLogout');
		let logoutBtn = fixture.debugElement.query(By.css('#logout-btn'));
		logoutBtn.nativeElement.click();

		expect(component.handleLogout).toHaveBeenCalled();
	});
});
