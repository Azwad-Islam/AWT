import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SellerService } from '../seller.service';
import { SellerDTO, loginDTO } from '../seller.dto';

@Injectable()
export class AuthService {
    constructor(
        private sellerService: SellerService,
        private jwtService: JwtService
    ) { }
    async signUp(myobj: SellerDTO): Promise<SellerDTO> {
        return await this.sellerService.addSeller(myobj);
    }
    async signIn(logindata: loginDTO): Promise<{ access_token: string }> {
        const user = await this.sellerService.findOne(logindata);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    // async login(logindata: loginDTO) {
    //     const staff = await this.warehouseService.search(logindata);
    //     const result = await bcrypt.compare(logindata.password, staff.password);
    //     if (result) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
}