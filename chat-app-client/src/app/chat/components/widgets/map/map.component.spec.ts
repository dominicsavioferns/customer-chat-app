import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { environment } from 'src/environments/environment';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
	let component: MapComponent;
	let fixture: ComponentFixture<MapComponent>;
	let latitude = 100;
	let longitude = 100;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MapComponent],
			imports: [
				BrowserAnimationsModule,
				MaterialModule
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MapComponent);
		component = fixture.componentInstance;
		component.latitude = latitude;
		component.longitude = longitude;
		component.height = "400px";
		component.width = "400px";
		component.author = 'dominic';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should sanitize the constructed maps url', () => {
		expect(component.getSanitizedMapsUrl()).toBeTruthy();
	});

	it('should load map from correct url', () => {
		let expectedUrl = environment.googleMapsUrl
			.replace('{lat}', latitude.toString())
			.replace('{key}', environment.googleApiKey)
			.replace('{long}', longitude.toString());

		let mapFrame = fixture.debugElement.query(By.css('iframe'));
		let mapUrl = mapFrame.nativeElement.attributes.src.value;

		expect(mapUrl).toEqual(expectedUrl);
	})
});
