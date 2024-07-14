import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
@Entity("seller")
//export class Seller {}
export class sellerEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
@Column()
social:string;
}