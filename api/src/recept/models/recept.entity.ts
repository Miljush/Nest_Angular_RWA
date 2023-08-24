import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/models/user.entity';
import { ReviewEntity } from 'src/review/models/review.entity';

@Entity('recept')
export class ReceptPostEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  ime?: string;

  @Column({ default: '' })
  opis?: string;

  @Column({ default: '' })
  priprema?: string;

  @Column('text', { array: true, nullable: true })
  sastojci: string[];

  @Column('text', { array: true, nullable: true })
  slike: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  

  @ManyToOne(type => UserEntity, user => user.recepti)
  user: UserEntity;

  @OneToMany(() => ReviewEntity, review => review.recipe)
  reviews: ReviewEntity[];

}