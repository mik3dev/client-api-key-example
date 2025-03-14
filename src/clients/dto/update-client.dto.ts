import { IsString, IsOptional, IsUrl, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty({
    description: 'The name of the client application',
    example: 'Updated App Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description of the client application',
    example: 'Updated description for the application',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Name of the person responsible for the client application',
    example: 'Jane Smith',
    required: false,
  })
  @IsString()
  @IsOptional()
  responsibleName?: string;

  @ApiProperty({
    description:
      'Contact information of the responsible person (email or phone)',
    example: 'jane.smith@example.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  responsibleContact?: string;

  @ApiProperty({
    description: 'URL of the client application',
    example: 'https://updated-app.example.com',
    required: false,
  })
  @IsUrl({ require_tld: false })
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Whether the client is active or not',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
