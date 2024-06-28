import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { NatsModule } from 'src/transport';


@Module({
  imports: [ NatsModule ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule { }
