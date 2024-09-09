import { HttpException, HttpStatus, Injectable, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { SellerEntity } from "./seller.entity";
import { SellerDTO, UpdateSellerDTO, loginDTO } from "./seller.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class SellerService {
    constructor(@InjectRepository(SellerEntity)
    private sellerRepo: Repository<SellerEntity>,
    private mailerService: MailerService,
        private jwtService: JwtService

    ) { }
    async addSeller(myobj: SellerEntity): Promise<SellerEntity> {
        return await this.sellerRepo.save(myobj);
    }
    async findOne(logindata: loginDTO): Promise<any> {
        return await this.sellerRepo.findOneBy({ email: logindata.email });
    }
    async getAllSeller(): Promise<SellerEntity[]> {
        return await this.sellerRepo.find();
    }
    async findOneByUsername(username: string): Promise<SellerEntity> {
        return this.sellerRepo.findOne({
            where: { username: username },
        });
    }
    async showProfile(email: string): Promise<SellerEntity> {
        const user = await this.sellerRepo.findOne({ where: { email } });
    
        if (!user) {
            throw new NotFoundException(`User with username ${email} not found`);
        }
    
        return user;
    }
    


    async updateOrder(id: number, sellerDTO: SellerDTO): Promise<SellerEntity> {
        await this.sellerRepo.update(id, sellerDTO);
        return this.getOrderById(id);
    }
    async getOrderById(id: number): Promise<SellerEntity> {
        const idString = id.toString();
        return this.sellerRepo.findOneBy({ sellerId: idString });
    }
    async remove(id: number): Promise<void> {
        await this.sellerRepo.delete(id);
    }
    getOrderByNameAndId(name, id): object {
        console.log(id, name);
        return { message: "your id is " + id + " and your name is " + name };
    }

    //semd mail
    sendMail() : void {
    this.mailerService.sendMail({
    to: 'albarhossain@gmail.com', 
    from: 'solemates.bd.2024@gmail.com', 
    subject: 'Welcome to Bangladesh\'s premier sneaker marketplace',
    text: 'Welcome', 
    html: '<b>Welcome User, Thank You for signing up.</b>', 
    })
}

    async search(logindata: loginDTO): Promise<SellerEntity> {
        return await this.sellerRepo.findOneBy({ email: logindata.email });
    }

    //DB Find
    async findByFullName(substring: string): Promise<SellerEntity[]> {
        return this.sellerRepo.find({
            where: { name: Like(`%${substring}%`) },
        });
    }

    async findOneBySellerUsername(username: string): Promise<SellerEntity> {
        return this.sellerRepo.findOne({
            where: { username: username },
        });
    }
 
    //
    async getSellerByID(id) {
        const data=await this.sellerRepo.findOneBy({ sellerId: id });
        console.log(data);
        if(data!==null) {
            return data;
        }
        else 
        {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    
    }
    
    async updateSellerById(id: string, data: UpdateSellerDTO): Promise<SellerEntity> {
        await this.sellerRepo.update(id, data);
        return this.sellerRepo.findOneBy({ sellerId: id });  
    }

}