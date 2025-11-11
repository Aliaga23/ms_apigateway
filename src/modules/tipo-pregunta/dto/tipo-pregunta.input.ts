import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateTipoPreguntaInput {
  @Field()
  @IsNotEmpty()
  @Length(1, 100)
  nombre: string;
}

@InputType()
export class UpdateTipoPreguntaInput {
  @Field({ nullable: true })
  @Length(1, 100)
  nombre?: string;
}
