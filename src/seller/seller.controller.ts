import { UseInterceptors, UploadedFile,Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, ParseIntPipe, Query, Put } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/seller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
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
  addSeller(@Body() myobj:sellerEntity): object {
    console.log(myobj);
    return this.sellerService.addSeller(myobj);
  }

  @Put('updateSeller/:id')
  updateSeller(@Body() myobj:CreateSellerDto, @Param('id') id:number): object {
    return this.sellerService.updateSeller(myobj,id)
  }
  
  //get all seller
  @Get('getAllSeller')
  getAllSeller(): Promise<sellerEntity[]> {
    return this.sellerService.getAllSeller();
  }
  //get seller by id
  @Get('getSellerByIddb/:id')
  getSellerByIddb(@Param('id', ParseIntPipe) id: number): Promise<sellerEntity>
  {
    return this.sellerService.getSellerByIddb(id);
  }


  //update seller
  @Put('updateSellerByIdDB/:id')
    async updateSellerByIdDB(@Param('id') id: number, @Body() updateCustomerDB: sellerEntity): Promise<sellerEntity> {
    return this.sellerService.updateSellerByIdDB(id, updateCustomerDB);
  }

  
@Delete('deleteSeller/:id')
async deleteSeller(@Param('id') id: number): Promise<string> {
  return this.sellerService.deleteSeller(id);
}

  @Post('addimage')
  @UseInterceptors(FileInterceptor('myfile',
  { fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    cb(null, true);
    else {
     cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
     }
    },
    limits: { fileSize: 3000000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
     cb(null,Date.now()+file.originalname)
    },
    })
    }
)
)
addImage(@Body() myobj:object,@UploadedFile() file: Express.Multer.File) {
console.log(file);
console.log(myobj);
return myobj;
}


@Get('/getimage/:name')
getImage(@Param('name') filename:string, @Res() res) {

 res.sendFile(filename,{ root: './uploads' })
 }

}
