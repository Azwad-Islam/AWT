import { NotContains, IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
 // @IsInt()
  product_id: number;
  brand: string;
  size: string;
  color: string;
  price:number;
  //@IsString()
 // @NotContains('0')
 // @NotContains('1')
 // @NotContains('2')
//  @NotContains('3')
 // @NotContains('4')
 // @NotContains('5')
 // @NotContains('6')
 // @NotContains('7')
//  @NotContains('8', {
   // message: 'name must not contain a number',
 // })
 // @NotContains('9', {
  //  message: 'name must not contain a number',
 // })
  

  //@IsInt()
 // @Min(0)
 // @Max(120)
 

  //@IsString()
 // @IsNotEmpty()
  
}
