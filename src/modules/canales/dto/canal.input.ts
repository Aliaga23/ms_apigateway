import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateCanalInput {
  @Field()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string;
}

@InputType()
export class UpdateCanalInput {
  @Field({ nullable: true })
  @Length(1, 100)
  nombre?: string;
}
