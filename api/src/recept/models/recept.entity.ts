import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('recept')
export class ReceptPostEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    ime?: string;

    @Column({default: ''})
    opis?: string;
    
    @Column({default: ''})
    sastojci?:string;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;
}