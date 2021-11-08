import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { CompleteComponent } from './complete.component';

describe('CompleteComponent', () => {
	let component: CompleteComponent;
	let fixture: ComponentFixture<CompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CompleteComponent],
			imports: [
				BrowserAnimationsModule,
				MaterialModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
