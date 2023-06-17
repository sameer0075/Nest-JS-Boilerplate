import { IsString, IsNotEmpty, MinLength, IsDate, IsOptional } from "class-validator";

export class BrandRequestDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description: string;
  }