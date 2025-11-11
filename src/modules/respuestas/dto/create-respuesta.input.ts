import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateRespuestaInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  texto?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  numero?: number;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  recibido_en?: string;

  @Field()
  @IsString()
  entregaId: string;

  @Field()
  @IsString()
  preguntaId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  opcionEncuestaId?: string;
}
