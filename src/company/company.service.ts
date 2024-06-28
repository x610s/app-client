import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CompanyService {

  constructor(
    @Inject(NATS_SERVICE.name) private client: ClientProxy,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await firstValueFrom(
        this.client.send('createCompany', createCompanyDto)
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.client.send('findAllCompany', {})
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
