import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/seller.dto';
//import { UpdateSellerDto } from './dto/update-seller.dto';
import { sellerEntity } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SellerService {
  constructor(@InjectRepository(sellerEntity) private sellerRepository: Repository<sellerEntity>) {}
  create(createSellerDto: CreateSellerDto) {
    return this.sellerRepository.save(createSellerDto);
  }
  getSellerById(id: number): object{
    return {message: "Seller id:  "+id };
    }
    getCustomerByNameAndId(name: string, id: number): object{
    return {message: "Customer name: "+name+" id:"+ id};
    }
    getCustomer(myobj:object): object{
    return myobj;
    }
    addSeller(myobj:CreateSellerDto): Promise<sellerEntity>{
    return this.sellerRepository.save(myobj);
    }
    
    updateCustomer(myobj:object, id: number): object{
    return {message: "update customerid: "+id, body:myobj}
    }
}

