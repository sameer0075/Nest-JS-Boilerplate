import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { BrandRequestDto } from './dto/request.dto';
import { BrandResponseDto } from './dto/response.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brandRep: BaseService<Brand>;

  constructor(
    private brandRepository: Repository<Brand>,
  ) {
    this.brandRep = new BaseService<Brand>(this.brandRepository);
  }
  async create(body: BrandRequestDto):Promise<BrandResponseDto> {
    const data:Brand = await this.brandRep.save(body);
    const {id,name,description} = data
    return new BrandResponseDto(id, name, description);
  }

  async findAll():Promise<BrandResponseDto[]> {
    const data:Brand[] = await this.brandRep.findAll({
      select:['id','name','description']
    })
    return data
  }

  async findOne(id: number):Promise<BrandResponseDto> {
    const data:Brand = await this.brandRep.findOne({
      select:['id','name','description'],
      where:{id}
    })
    return data
  }

  async update(id: number, body: BrandRequestDto):Promise<BrandResponseDto> {
    const data = await this.brandRep.update(id,body)
    if(data.affected > 0) {
      const savedData:Brand = await this.brandRep.findOne({
        select:['id','name','description'],
        where:{id}
      })

      if(savedData) {
        const {id,name,description} = savedData
        return new BrandResponseDto(id, name, description);
      } else {
        throw "Brand not updated"
      }
    }
  }

  async remove(id: number):Promise<void> {
    await this.brandRep.delete(id)
  }
}
