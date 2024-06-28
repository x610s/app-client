import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async create(@UploadedFile() picture: Express.Multer.File, @Body() createUserDto: CreateUserDto) {

    if (!picture)
      throw new BadRequestException('users.error.e1');

    return await this.userService.create(createUserDto, picture);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
