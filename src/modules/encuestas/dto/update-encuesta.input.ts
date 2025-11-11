import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateEncuestaInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(2)
  @IsOptional()
  nombre?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @Field({ nullable: true })
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
