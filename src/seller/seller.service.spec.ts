
//import { SellerService } from './seller.service';
import { sellerEntity } from './entities/seller.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSellerDto } from './dto/seller.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SellerService {

  constructor(
    @InjectRepository(sellerEntity)  private SellerRepo: Repository<sellerEntity>,
    // @InjectRepository(Manager)  private managerRepo: Repository<Manager>
){}

  create(createSellerDto: CreateSellerDto) {
    return 'This action adds a new Seller';
  }

  findAll() {
    return `This action returns all Seller`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Seller`;
  }

  update(id: number, updateSellerDto: CreateSellerDto) {
    return `This action updates a #${id} Seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} Seller`;
  }

  //new Code from here

  getSellerById(id: number): object{
    return {message: "Seller id:  "+id };
    }
    getSellerByNameAndId(name: string, id: number): object{
    return {message: "Seller name: "+name+" id:"+ id};
    }
    getSeller(myobj:object): object{
    return myobj;
  }
  //Add new Seller to DB
    addSeller(myobj:CreateSellerDto): Promise<sellerEntity>{
    return this.SellerRepo.save(myobj);
  }
  //Show all Seller from DB NOT WORKING
  getAllSeller(): Promise<sellerEntity[]> {
    return this.SellerRepo.find();
  }

  getSellerByIdDB(id: number): Promise<sellerEntity> {
    return this.SellerRepo.findOneBy({ id: id });
  }

  async updateSellerByIdDB(id: number, updateSeller: sellerEntity): Promise<sellerEntity> {
    await this.SellerRepo.update(id, updateSeller);
    return this.SellerRepo.findOneBy({ id: id });
  }

  async deleteSeller(id: number): Promise<string> {
    await this.SellerRepo.delete(id);
    return `Seller with ID ${id} deleted successfully`; 
  }


    
    updateSeller(myobj:object, id: number): object{
    return {message: "update Sellerid: "+id, body:myobj}
    }
}
