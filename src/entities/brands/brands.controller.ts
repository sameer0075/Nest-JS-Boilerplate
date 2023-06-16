import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import {Response} from 'express'
import PostgreStatusCode from 'src/enums/PostgresErrorCode';
import { AuthGuard } from 'src/guard/auth.guard';
import { BrandsService } from './brands.service';
import { BrandRequestDto } from './dto/request.dto';
import { BrandResponseDto } from './dto/response.dto';

@Controller('brands')
@UseGuards(AuthGuard)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(response: Response,@Body() body:BrandRequestDto):Promise<BrandResponseDto> {
    try {
      const data = await this.brandsService.create(body)
      response.status(PostgreStatusCode.SuccessCode).send(data)
      return data
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }

  @Get()
  async findAll(response: Response):Promise<BrandResponseDto[]> {
    try {
      const data = await this.brandsService.findAll()
      response.status(PostgreStatusCode.SuccessCode).send(data)
      return data;
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }

  @Get(':id')
  async findOne(response: Response,@Param('id') id: number):Promise<BrandResponseDto> {
    try {
      const data = await this.brandsService.findOne(id)
      response.status(PostgreStatusCode.SuccessCode).send(data)
      return data;
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }

  @Delete(':id')
  async remove(response: Response,@Param('id') id: number):Promise<void> {
    try {
      const data = await this.brandsService.remove(id)
      response.status(PostgreStatusCode.SuccessCode).send(data)
    } catch(err) {
      response.status(PostgreStatusCode.AuthorizationError).send(err)
    }
  }
}
