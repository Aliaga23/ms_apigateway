import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCampanaInput {
  @Field()
  @IsString()
  @MinLength(2)
  nombre: string;
}
