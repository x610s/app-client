import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { NatsModule } from 'src/transport';

@Module({
  imports: [NatsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
