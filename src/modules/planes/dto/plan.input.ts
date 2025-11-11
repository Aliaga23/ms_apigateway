import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class CreatePlanInput {
  @Field()
  @IsNotEmpty()
  nombre: string;

  @Field()
  @IsNotEmpty()
  descripcion: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  precio: number;
}

@InputType()
export class UpdatePlanInput {
  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Float, { nullable: true })
  precio?: number;

  @Field({ nullable: true })
  activo?: boolean;
}
