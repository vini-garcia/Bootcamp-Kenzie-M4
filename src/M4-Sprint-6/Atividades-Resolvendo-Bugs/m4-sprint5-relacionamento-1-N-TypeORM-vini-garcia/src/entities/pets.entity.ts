import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Owner } from "./owners.entity";


@Entity('pets')
class Pets {
    @PrimaryGeneratedColumn("increment")
    id: number;
    
    @Column()
    name: string;

    @Column()
    breed: string;

    @Column()
    weight: number;

    @ManyToOne(() => Owner, (o) => o.pets)
    owner: Owner
}

export { Pets }