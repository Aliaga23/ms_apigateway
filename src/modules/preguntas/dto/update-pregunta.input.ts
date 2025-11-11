import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsBoolean, Min, MinLength, IsOptional } from 'class-validator';

@InputType()
export class UpdatePreguntaInput {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  orden?: number;

  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  texto?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  obligatorio?: boolean;
}
