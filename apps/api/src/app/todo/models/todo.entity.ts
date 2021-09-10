import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo-list')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
