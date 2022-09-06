import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column({length: 5})
  number?: string;

  @Column()
  city: string;

  @Column()
  state: string;
}