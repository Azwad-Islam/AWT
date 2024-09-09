import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, ParseIntPipe, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/seller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { sellerEntity } from './entities/seller.entity';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('addSeller')
  @UsePipes(new ValidationPipe())
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Post('addSeller')
  @UsePipes(new ValidationPipe())
  addSeller(@Body() myobj: CreateSellerDto): Promise<sellerEntity> {
    return this.sellerService.addSeller(myobj);
  }

  @Put('updateSeller/:id')
  @UsePipes(new ValidationPipe())
  updateSeller(@Body() myobj: CreateSellerDto, @Param('id', ParseIntPipe) id: number): object {
    return this.sellerService.updateSeller(myobj, id);
  }

  // Get all sellers
  @Get('getAllSeller')
  getAllSeller(): Promise<sellerEntity[]> {
    return this.sellerService.getAllSeller();
  }

  // Get seller by ID
  @Get('getSellerByIddb/:id')
  getSellerByIddb(@Param('id', ParseIntPipe) id: number): Promise<sellerEntity> {
    return this.sellerService.getSellerByIddb(id);
  }

  // Update seller by ID
  @Patch('updateSellerByIdDB/:id')
  @UsePipes(new ValidationPipe())
  async updateSellerByIdDB(@Param('id', ParseIntPipe) id: number, @Body() updateSellerDto: CreateSellerDto): Promise<sellerEntity> {
    return this.sellerService.updateSellerByIdDB(id, updateSellerDto);
  }

  // Delete seller
  @Delete('deleteSeller/:id')
  async deleteSeller(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.sellerService.deleteSeller(id);
  }

  //task
  //inactive
  @Get('inactive')
  getInactiveSellers() {
    return this.sellerService.getInactiveSellers();
  }
  //older than 40
  @Get('olderThan40')
  getSellersOlderThan40() {
    return this.sellerService.getSellersOlderThan40();
  }

  //
  @Post('addimage')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  addImage(@Body() myobj: object, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log(myobj);
    return myobj;
  }

  @Get('getimage/:name')
  getImage(@Param('name') filename: string, @Res() res) {
    res.sendFile(filename, { root: './uploads' });
  }
  
}
