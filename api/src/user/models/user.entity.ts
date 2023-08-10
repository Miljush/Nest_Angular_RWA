import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReceptPostEntity } from '../../recept/models/recept.entity'; // Update the path to match the actual location of the Recept entity
import { ReviewEntity } from 'src/review/models/review.entity';
import { Role } from './role.enum';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'enum',enum:Role,default:Role.USER })
  role: Role;

  @Column({ default: '' })
  username?: string;

  @Column({ default: '' })
  ime?: string;

  @Column({ default: '' })
  prezime?: string;
  

  @Column({ default: '' })
  email?: string;

  @Column({ default: '' })
  sifra?: string;

  @Column({ default: '' })
  slika?: string;

  @Column('text', { array: true, nullable: true })
  lajkovaniRecepti: number[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(type => ReceptPostEntity, recept => recept.user)
  recepti: ReceptPostEntity[];

  @OneToMany(() => ReviewEntity, review => review.user)
  reviews: ReviewEntity[];

}