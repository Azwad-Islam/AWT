import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.services';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get()
    getAdmin(): object {
        return this.adminService.getAdmin();
    }
    
    @Get('get/:id')
    getAdminByID(@Param('id') id: number): object {
        return this.adminService.getAdminByID(id);
    }


    @Get('getbynameandid')
    getAdminByNameAndId(@Query('name') name: string, @Query('id') id: number): object {
        return this.adminService.getAdminByNameAndId(name, id);
    }
}
