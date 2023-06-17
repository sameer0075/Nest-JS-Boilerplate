import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, Res } from '@nestjs/common';
import {Response} from 'express'
import { LoggedInUser } from 'src/common/helper/decorators/current-user.decorator';
import PostgreStatusCode from 'src/enums/PostgresErrorCode';
import { AuthGuard } from 'src/guard/auth.guard';
import { BrandsService } from './brands.service';
import { BrandRequestDto } from './dto/request.dto';
import { BrandResponseDto } from './dto/response.dto';

@Controller('brands')
@UseGuards(AuthGuard)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post("/")
  async create(@LoggedInUser() user,@Res() response: Response,@Body() body:BrandRequestDto):Promise<BrandResponseDto> {
    try {
      const data = await this.brandsService.create(body)
      response.status(PostgreStatusCode.SuccessCode).send(data)
      return data
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }

  @Get("/")
  async findAll(@LoggedInUser() user,@Res() response: Response):Promise<BrandResponseDto[]> {
    try {
      console.log("user",user)
      const data = await this.brandsService.findAll()
      response.status(PostgreStatusCode.SuccessCode).send(data)
      return data;
    } catch(err) {
      console.log("err",err)
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }

  @Get('/:id')
  async findOne(@LoggedInUser() user,@Res() response: Response,@Param('id',ParseIntPipe) id: number):Promise<BrandResponseDto> {
    try {
      const data = await this.brandsService.findOne(id)
      response.status(PostgreStatusCode.SuccessCode).send(data)
      return data;
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }

  @Delete('/:id')
  async remove(@LoggedInUser() user,@Res() response: Response,@Param('id',ParseIntPipe) id: number):Promise<void> {
    try {
      const data = await this.brandsService.remove(id)
      response.status(PostgreStatusCode.SuccessCode).send(data)
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }
}
