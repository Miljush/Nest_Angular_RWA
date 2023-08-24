import { ReceptPostEntity } from 'src/recept/models/recept.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('review')
export class ReviewEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: 1 })
    starRating?: number;
  
    @Column({ default: '' })
    komentar?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, user => user.reviews)
    user: UserEntity;

    @ManyToOne(() => ReceptPostEntity, recipe => recipe.reviews)
    recipe: ReceptPostEntity;

    

}
