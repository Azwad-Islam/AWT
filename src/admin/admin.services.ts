import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    getAdmin(): object {
        return { message: 'Hello Admin!' };
    }
    
    getAdminByID(id: number): object {
        return {
            message: 'Admin id: ' + id

        }
    }

        getAdminByNameAndId(name: string, id: number): object {
            return { message: "Admin name: " + name + " id:" + id };
        
        }
        
    }
