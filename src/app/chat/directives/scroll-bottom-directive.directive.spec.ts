import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollBottomDirective } from './scroll-bottom-directive.directive';

@Component({
	template: '<div style="overflow:auto" class="messages"></div>'
})
class TestScrollToBottomComponent {

}

describe('ScrollToBottomDirective', () => {
	let component: TestScrollToBottomComponent;
	let fixture: ComponentFixture<TestScrollToBottomComponent>;
	let el: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestScrollToBottomComponent, ScrollBottomDirective],
		});

		fixture = TestBed.createComponent(TestScrollToBottomComponent)
		component = fixture.componentInstance
		el = fixture.debugElement.query(By.css('.messages'));
		fixture.detectChanges;
	})

	it('should have initial scroll height of 0', () => {
		expect(el.nativeElement.scrollHeight).toEqual(0);
	})

	it('should scroll to bottom when height of element increases', () => {
		let sizeIncrease = 1000;
		el.nativeElement.style.height = `${sizeIncrease}px`;
		expect(el.nativeElement.scrollHeight).toEqual(sizeIncrease);
	});
});
