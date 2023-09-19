import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "./pets.entity";

@Entity('owners')
class Owner{
@PrimaryGeneratedColumn("increment")
id: number;

@Column()
name: string;

@Column()
email:string;

@OneToMany(() => Pets, (p) => p.owner)
pets: Array<Pets>
}

export { Owner }