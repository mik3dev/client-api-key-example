import { IsString, IsOptional, IsUrl, IsBoolean } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  responsibleName?: string;

  @IsString()
  @IsOptional()
  responsibleContact?: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
