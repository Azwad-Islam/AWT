import { Entity, Column, PrimaryColumn,PrimaryGeneratedColumn} from 'typeorm';
@Entity("seller")
//export class Seller {}
export class sellerEntity{
@PrimaryColumn()
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