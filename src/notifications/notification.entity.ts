import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  type: 'email' | 'sms' | 'in-app';

  @Column()
  message: string;

  @Column({ default: false })
  isSent: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
