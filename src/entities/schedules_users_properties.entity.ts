import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Properties } from "./properties.entity";
import { Users } from "./user.entity";

@Entity("schedules_users_properties")
export class Schedules_users_properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({type: 'date'})
  date: string;

  @Column({type: 'time'})
  hour: string;

  @ManyToOne(() => Users, {eager: true})
  user: Users

  @ManyToOne(() => Properties, {eager: true})
  property: Properties
}
