import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('display_ranges')
export class DisplayRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  x: number;

  @Column('decimal', { precision: 10, scale: 2 })
  y: number;

  @Column('decimal', { precision: 10, scale: 2 })
  zMin: number;

  @Column('decimal', { precision: 10, scale: 2 })
  zMax: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  flip: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;
}
