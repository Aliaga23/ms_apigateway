import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateEncuestaInput {
  @Field()
  @IsString()
  @MinLength(2)
  nombre: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @Field({ defaultValue: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  campanaId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  canalId?: string;
}
