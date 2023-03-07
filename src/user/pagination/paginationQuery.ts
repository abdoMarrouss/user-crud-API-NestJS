// @ts-ignore
import { IsPositive } from "class-validator";
// @ts-ignore
import { IsOptional } from "class-validator";

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  numberOfElements: number;

  @IsOptional()
  page: number;
}