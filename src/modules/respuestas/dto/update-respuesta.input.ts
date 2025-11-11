import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateRespuestaInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  texto?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  numero?: number;
}
