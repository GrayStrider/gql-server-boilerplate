import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

describe('appController', () => {
	let app: TestingModule;
	
	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();
	});
	
	describe('getHello', () => {
		it('should return "Hello World!"', () => {
			expect.assertions(1)
			const appController = app.get<AppController>(AppController);
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
