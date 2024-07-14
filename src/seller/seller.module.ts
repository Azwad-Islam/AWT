import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { sellerEntity } from "./entities/seller.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([sellerEntity]),],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
