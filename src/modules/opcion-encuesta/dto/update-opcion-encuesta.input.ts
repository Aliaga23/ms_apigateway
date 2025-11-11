import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateOpcionEncuestaInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  texto?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  valor?: string;
}
