import { JsonController, Get } from 'routing-controllers';
import { Service } from 'typedi';
import { LoggerConfig } from '../utils/winston';
@JsonController()
@Service()
export class TestController {
    logger = new LoggerConfig('TestController');

    @Get('/test')
    getAll(): string {
        this.logger.logger.info('Get test');
        return 'test';
    }
}
