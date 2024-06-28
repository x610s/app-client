import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { NatsModule } from './transport';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NATS_SERVICE_NAME: Joi.string().required(),
        NATS_SERVICE_SERVERS: Joi.string().required(),
      }),
    }),
    NatsModule,
    UserModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
