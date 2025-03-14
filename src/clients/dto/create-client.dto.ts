import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client application',
    example: 'My Mobile App',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the client application',
    example: 'Mobile application for iOS and Android',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Name of the person responsible for the client application',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  responsibleName: string;

  @ApiProperty({
    description:
      'Contact information of the responsible person (email or phone)',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  responsibleContact: string;

  @ApiProperty({
    description: 'URL of the client application',
    example: 'https://myapp.example.com',
    required: false,
  })
  @IsUrl({ require_tld: false })
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Whether the client is active or not',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
