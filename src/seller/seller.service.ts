import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/seller.dto';
import { sellerEntity } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SellerService {
  getCustomerById(id: number): object {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(sellerEntity) private sellerRepository: Repository<sellerEntity>) {}
  create(createSellerDto: CreateSellerDto) {
    return this.sellerRepository.save(createSellerDto);
  }
   //Show all customer from DB NOT WORKING
   getAllSeller(): Promise<sellerEntity[]> {
    return this.sellerRepository.find();
  }
  getSellerById(id: number): object{
    return {message: "Seller id:  "+id };
    }
    getSellerByNameAndId(name: string, id: number): object{
    return {message: "Seller name: "+name+" id:"+ id};
    }
    getSeller(myobj:object): object{
    return myobj;
    }
    addSeller(myobj:CreateSellerDto): Promise<sellerEntity>{
    return this.sellerRepository.save(myobj);
    }
    
    updateSeller(myobj:object, id: number): object{
    return {message: "update SellerId: "+id, body:myobj}
    }
}

