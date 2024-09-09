import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "./Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { SellerDTO ,UpdateSellerDTO} from "./seller.dto";
import { SellerEntity } from "./seller.entity";
import { SessionGuard } from "./session.guard";
import { SellerService } from "./seller.service";

@Controller('seller')
export class SellerController {
    constructor(private readonly SellerService: SellerService) {}
     //Send mail
    //1
    @UseGuards(SessionGuard)
    @Get('/email')
    sendMail(): void {
    return this.SellerService.sendMail();
    }

    //2
    @UseGuards(SessionGuard)
    @Get('/dashboard')
    getseller(): object {
        try {
            return this.SellerService.getAllSeller();
        }
        catch {
            return { error: 'invalid' };
        }
    }

    //3
    @UseGuards(SessionGuard)
    @Get('/viewprofile')
    async showProfile(@Session() session): Promise<object> {
        if (!session || !session.email) {
            throw new UnauthorizedException("User is not logged in");
        }
    
        try {
            return await this.SellerService.showProfile(session.email);
        } catch (error) {
            throw new InternalServerErrorException("Failed to show profile");
        }
    }

    //4
    @UseGuards(SessionGuard)
    @Put('/update/:id')
    updateUsersById(@Param('id') id: number): object {
        try {
            return this.SellerService.remove(id);
        } catch {
            throw new InternalServerErrorException("Failed to update profile");
        }
    }

    //5
    @UseGuards(SessionGuard)
    @Get('/findseller/:id')
    async getSellerByID(@Param('id', ParseIntPipe) id: number): Promise<SellerEntity> {
      const res = await this.SellerService.getSellerByID(id);
          if (res !== null) {
              return await this.SellerService.getSellerByID(id);
          }
          else {
              throw new HttpException("Seller not found", HttpStatus.NOT_FOUND);
          }
    }

    //6
    @Put('/updateseller/:id')
    @UsePipes(new ValidationPipe())
    updateSellerbyID(@Param('id') id: string, @Body() data:UpdateSellerDTO ): object {
        return this.SellerService.updateSellerById(id, data);
    }

    //7
    @UseGuards(SessionGuard)
    @Delete('/delete/:id')
    deleteUserbyId(@Param('id') id: number): object {
        try {
            return this.SellerService.remove(id);

        } catch {
            throw new InternalServerErrorException("Failed to delete profile");
        }
    }



    //8
    @UseGuards(SessionGuard)
    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }


    //9
    @UseGuards(SessionGuard)
    @Get('fullname/:substring')
    async getUserBySubString(@Param('substring') substring: string): Promise<SellerEntity[]> {
        

        try {
            return this.SellerService.findByFullName(substring);

        } catch {
            throw new InternalServerErrorException("Seller name does not exist.");
        }
    }

    //10
    @UseGuards(SessionGuard)
    @Get('usernames/:username')
    async getUserByUsername(@Param('username') username: string): Promise<SellerEntity> {
        return this.SellerService.findOneByUsername(username);
    }

};