import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSuscripcionInput {
  @Field()
  @IsNotEmpty()
  usuario_id: string;

  @Field()
  @IsNotEmpty()
  plan_id: string;
}

@InputType()
export class UpdateSuscripcionInput {
  @Field({ nullable: true })
  estado?: string;

  @Field({ nullable: true })
  fecha_fin?: Date;
}
