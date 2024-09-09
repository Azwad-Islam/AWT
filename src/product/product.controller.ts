import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, ParseIntPipe, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('addSeller')
  @UsePipes(new ValidationPipe())
  addProduct(@Body() myobj: CreateProductDto) : Promise<ProductEntity>{
    return this.productService.addProduct(myobj);
  }

}