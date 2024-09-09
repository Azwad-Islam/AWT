import { Entity, Column, PrimaryColumn,PrimaryGeneratedColumn} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryColumn({ type:'int'})
  product_id: number;

  @Column({ name: 'brand', type: 'varchar', length: 100 })
  brand: string;

  @Column({ name:'size',type: 'varchar'})
  size: string;

  @Column({ name:'color',type: 'varchar'})
  color: string;
  @Column({ name:'price',type: 'int'})
  price: number;
}