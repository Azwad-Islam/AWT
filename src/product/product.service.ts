import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) 
    private ProductRepository: Repository<ProductEntity>,
  ) {}
  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.ProductRepository.save(createProductDto);
  }
  // Add product
  addProduct(myobj: CreateProductDto): Promise<ProductEntity> {
    return this.ProductRepository.save(myobj);
  }
}