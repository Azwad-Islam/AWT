import { Contains, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsString, IsUrl, isURL, Length, Matches, MaxLength, NotContains } from 'class-validator';

export class CreateSellerDto {

    @NotContains('0')
    @NotContains('1')
    @NotContains('2')
    @NotContains('3')
    @NotContains('4')
    @NotContains('5')
    @NotContains('6')
    @NotContains('7')
    @NotContains('8',{
        message: 'name must not contain a number ',
    })
    @NotContains('9',{
        message: 'name must not contain a number ',
    })
    
    name: string;

    @Contains('@')
    @Contains('.')
    @MaxLength(30)
    email: string;
    
    // @IsNotEmpty()
    // phone: string;

    @IsNotEmpty()
    @Matches(/.*[@#$&].*/,  {
        message: 'Password must contain at least one special character (@, #, $, &).',
    })
    password: string;


    @IsUrl()
    @Contains('www.')
    social: string;
}
export class CustomerUpdateDTO{
    @IsEmail()
    "username" :string;
    "address":string;
}
