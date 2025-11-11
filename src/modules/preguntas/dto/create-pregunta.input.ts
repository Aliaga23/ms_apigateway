import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsBoolean, Min, MinLength } from 'class-validator';

@InputType()
export class CreatePreguntaInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  orden: number;

  @Field()
  @IsString()
  @MinLength(2)
  texto: string;

  @Field()
  @IsBoolean()
  obligatorio: boolean;

  @Field()
  @IsString()
  encuestaId: string;

  @Field()
  @IsString()
  tipo_preguntaId: string;
}
