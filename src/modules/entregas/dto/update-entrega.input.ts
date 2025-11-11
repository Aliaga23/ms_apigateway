import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsOptional } from 'class-validator';

@InputType()
export class UpdateEntregaInput {
  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  enviado_en?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  respondido_en?: string;
}
