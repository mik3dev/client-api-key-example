import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsBoolean,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  responsibleName: string;

  @IsString()
  @IsNotEmpty()
  responsibleContact: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
