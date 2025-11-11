import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDateString, IsOptional } from 'class-validator';

@InputType()
export class CreateEntregaInput {
  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  enviado_en?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  respondido_en?: string;

  @Field()
  @IsString()
  encuestaId: string;

  @Field()
  @IsString()
  destinatarioId: string;
}
