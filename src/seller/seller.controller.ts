import { UseInterceptors, UploadedFile,Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/seller.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";

//import { UpdateSellerDto } from './dto/update-seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('addSeller')
  @UsePipes(new ValidationPipe())
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
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
