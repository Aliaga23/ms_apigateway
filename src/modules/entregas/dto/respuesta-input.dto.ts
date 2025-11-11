import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class RespuestaItemInput {
  @Field()
  @IsString()
  preguntaId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  opcionId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  texto?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  imagen?: string;
}

@InputType()
export class GuardarRespuestasInput {
  @Field()
  @IsString()
  entregaId: string;

  @Field(() => [RespuestaItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaItemInput)
  respuestas: RespuestaItemInput[];
}
