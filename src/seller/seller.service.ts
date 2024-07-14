import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/seller.dto';
import { sellerEntity } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SellerService {
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(sellerEntity) private sellerRepository: Repository<sellerEntity>) {}
  create(createSellerDto: CreateSellerDto) {
    return this.sellerRepository.save(createSellerDto);
  }
   //Show all seller from db WORKING
   getAllSeller(): Promise<sellerEntity[]> {
    return this.sellerRepository.find();
  }
  getSellerByIddb(id: number): Promise<sellerEntity> {
    return this.sellerRepository.findOneBy({ id: id });
  }
  //update
  async updateSellerByIdDB(id: number, updateCustomer: sellerEntity): Promise<sellerEntity> {
    await this.sellerRepository.update(id, updateCustomer);
    return this.sellerRepository.findOneBy({ id: id });
  }
  //delete
  async deleteSeller(id: number): Promise<string> {
    await this.sellerRepository.delete(id);
    return `Seller with ID ${id} deleted successfully`; 
  }
   //addseller
   addSeller(myobj:CreateSellerDto): Promise<sellerEntity>{
    return this.sellerRepository.save(myobj);
    }

  getSellerById(id: number): object{
    //throw new Error('Method not implemented.');

    return {message: "Seller id:  "+id };
    }
    getSellerByNameAndId(name: string, id: number): object{
    return {message: "Seller name: "+name+" id:"+ id};
    }
    getSeller(myobj:object): object{
    return myobj;
    }
   
    
    updateSeller(myobj:object, id: number): object{
    return {message: "update SellerId: "+id, body:myobj}
    }
    
}

