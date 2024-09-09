import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/seller.dto';
import { sellerEntity } from './entities/seller.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(sellerEntity) 
    private sellerRepository: Repository<sellerEntity>,
  ) {}

  create(createSellerDto: CreateSellerDto): Promise<sellerEntity> {
    return this.sellerRepository.save(createSellerDto);
  }

  // Show all sellers from the database
  getAllSeller(): Promise<sellerEntity[]> {
    return this.sellerRepository.find();
  }

  getSellerByIddb(id: number): Promise<sellerEntity> {
    return this.sellerRepository.findOneBy({ id });
  }

  // Update seller by ID
  async updateSellerByIdDB(id: number, updateSellerDto: CreateSellerDto): Promise<sellerEntity> {
    await this.sellerRepository.update(id, updateSellerDto);
    return this.sellerRepository.findOneBy({ id });
  }

  // Delete seller by ID
  async deleteSeller(id: number): Promise<string> {
    await this.sellerRepository.delete(id);
    return `Seller with ID ${id} deleted successfully`; 
  }

  // Add seller
  addSeller(myobj: CreateSellerDto): Promise<sellerEntity> {
    return this.sellerRepository.save(myobj);
  }



  //for task
  //inactive seller
  async getInactiveSellers(): Promise<sellerEntity[]> {
    return this.sellerRepository.find({ where: [{ status: 'inactive' }], });
  }
  async getSellersOlderThan40(): Promise<sellerEntity[]> {
    return this.sellerRepository.find({ where: { age: MoreThan(40) } });
  }



  getSellerById(id: number): object {
    return { message: `Seller id: ${id}` };
  }

  getSellerByNameAndId(name: string, id: number): object {
    return { message: `Seller name: ${name} id: ${id}` };
  }

  getSeller(myobj: object): object {
    return myobj;
  }

  updateSeller(myobj: CreateSellerDto, id: number): object {
    return { message: `Update SellerId: ${id}`, body: myobj };
  }
  
}
