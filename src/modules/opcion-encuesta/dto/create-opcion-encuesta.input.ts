import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateOpcionEncuestaInput {
  @Field()
  @IsString()
  @MinLength(1)
  texto: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  valor?: string;

  @Field()
  @IsString()
  preguntaId: string;
}
