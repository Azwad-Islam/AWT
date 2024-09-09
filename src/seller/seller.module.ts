import { Module } from "@nestjs/common";
import { SellerController } from "./seller.controller";
import { SellerService } from "./seller.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { SellerEntity } from "./seller.entity";
import { AuthService } from "./Auth/auth.service";
import { ProductEntity } from "./product.entity";
import { ListingEntity } from "./listing.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    imports: [TypeOrmModule.forFeature([SellerEntity, ProductEntity, ListingEntity]),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: 'solemates.bd.2024@gmail.com',
            pass: 'adfzrukqegtwdsxu',
          },
        },
      }),
    JwtModule.register({
        global: true,
        secret: "3NP_Backend_Seller",
        signOptions: { expiresIn: '30m' },
    }),
    ],
    controllers: [SellerController],
    providers: [SellerService, AuthService],
    exports: [SellerService],
})

export class SellerModule { }