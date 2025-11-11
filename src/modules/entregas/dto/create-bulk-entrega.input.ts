import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min } from 'class-validator';

@InputType()
export class CreateBulkEntregaInput {
  @Field()
  @IsUUID()
  encuestaId: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  cantidad: number;
}
