import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { RateComponent } from './rate.component';

describe('RateComponent', () => {
	let component: RateComponent;
	let fixture: ComponentFixture<RateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RateComponent],
			imports: [
				BrowserAnimationsModule,
				MaterialModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
