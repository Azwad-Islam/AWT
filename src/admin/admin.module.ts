import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.services";

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [AdminService],
  })

export class AdminModule{}