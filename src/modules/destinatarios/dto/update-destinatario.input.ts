import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateDestinatarioInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  nombre?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  telefono?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}
