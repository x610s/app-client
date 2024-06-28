import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NATS_SERVICE } from 'src/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    @Inject(NATS_SERVICE.name) private client: ClientProxy,
  ) {

  }
  async create(createUserDto: CreateUserDto, picture: Express.Multer.File) {
    try {
      return await firstValueFrom(
        this.client.send('createUser', { ...createUserDto, picture })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.client.send('findAllUsers', {})
      );
    } catch (error) {
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.client.send('findOneUser', id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
