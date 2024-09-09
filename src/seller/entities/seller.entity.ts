import { Entity, Column, PrimaryColumn,PrimaryGeneratedColumn} from 'typeorm';

@Entity('seller')
export class sellerEntity {
  @PrimaryColumn({ type:'int', unsigned:true})
  id: number;

  @Column({ name: 'fullname', type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', unsigned:true})
  age: number;

  @Column({ default: 'active' , enum: ['active', 'inactive']})
  status: string;
}
