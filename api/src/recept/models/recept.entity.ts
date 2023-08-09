import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';

@Entity('recept')
export class ReceptPostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  ime?: string;

  @Column({ default: '' })
  opis?: string;

  @Column('text', { array: true, nullable: true })
  sastojci: string[];

  @Column('text', { array: true, nullable: true })
  slike: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  

  @ManyToOne(type => UserEntity, user => user.recepti)
  user: UserEntity;
}