import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
  realEstate: RealEstate[];
}
