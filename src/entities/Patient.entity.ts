import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('patient_details')
export class Patient {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ type: 'text', nullable: true })
  medical_history: string;

  @Column({ nullable: true })
  emergency_contact: string;

  @Column({ nullable: true })
  insurance_info: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
