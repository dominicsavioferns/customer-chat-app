import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';

describe('ChatService', () => {
	let service: ChatService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ChatService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should have subjects defined', () => {
		expect(service.message$).toBeDefined();
		expect(service.command$).toBeDefined();
	});

	it('should have an active listner for new message event', () => {
		expect(service.socket.hasListeners('message')).toBeTrue();
	});

	it('should have an active listner for new command event', () => {
		expect(service.socket.hasListeners('command')).toBeTrue();
	});

	describe('sendMessage', () => {
		it('should emit message event server', () => {
			expect(service.sendMessage({ author: 'dominic', message: 'Hello' })).toBeTruthy();
		});
	});

	describe('triggerCommand', () => {
		it('should emit command event server', () => {
			expect(service.triggerCommand({ author: 'dominic', message: 'Hello' })).toBeTruthy();
		});
	});

	describe('setResponse  and getResponse', () => {
		it('should set and get customer response', () => {
			service.setResponse('map', 'data');
			expect(service.getResponse('map')).toEqual('data');
		});
	});

	describe('getAllResponses', () => {
		it('should get all responses of customer', () => {
			service.setResponse('map', 'data');
			expect(service.getAllResponses()).toEqual({ map: 'data' });

		});
	});

	describe('resetChatResponses', () => {
		it('should reset customer responses map', () => {
			service.setResponse('map', 'data');
			service.resetChatResponses()
			expect(service.getAllResponses()).toEqual({});
		});
	});
});
