import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateDestinatarioInput {
  @Field()
  @IsString()
  @MinLength(2)
  nombre: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  telefono?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}
