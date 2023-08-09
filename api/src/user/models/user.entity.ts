import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReceptPostEntity } from '../../recept/models/recept.entity'; // Update the path to match the actual location of the Recept entity

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  ime?: string;

  @Column({ default: '' })
  prezime?: string;
  

  @Column({ default: '' })
  email?: string;

  @Column({ default: '' })
  slika?: string;

  @Column('text', { array: true, nullable: true })
  lajkovaniRecepti: number[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(type => ReceptPostEntity, recept => recept.user)
  recepti: ReceptPostEntity[];
}