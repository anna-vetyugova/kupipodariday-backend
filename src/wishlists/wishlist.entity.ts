import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Length } from 'class-validator/types/decorator/string/Length';
import { User } from 'src/users/user.entity';
import { Wish } from 'src/wishes/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column({ length: 1500, nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, user => user.wishlists)
  user: User;

  @OneToMany(() => Wish, wish => wish.wishlist)
  items: Wish[];
}
