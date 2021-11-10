import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { DateComponent } from './date.component';

describe('DateComponent', () => {
	let component: DateComponent;
	let fixture: ComponentFixture<DateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DateComponent],
			imports: [
				BrowserAnimationsModule,
				MaterialModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
