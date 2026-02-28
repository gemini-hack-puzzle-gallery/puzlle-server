import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisplayRange } from './display-range.entity';

@Injectable()
export class DisplayRangeService {
  constructor(
    @InjectRepository(DisplayRange)
    private displayRangeRepository: Repository<DisplayRange>,
  ) {}

  async findAll(): Promise<DisplayRange[]> {
    return this.displayRangeRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<DisplayRange> {
    return this.displayRangeRepository.findOne({ where: { id } });
  }

  async create(displayRange: Partial<DisplayRange>): Promise<DisplayRange> {
    const newDisplayRange = this.displayRangeRepository.create(displayRange);
    return this.displayRangeRepository.save(newDisplayRange);
  }

  async createMany(displayRanges: Partial<DisplayRange>[]): Promise<DisplayRange[]> {
    const newDisplayRanges = this.displayRangeRepository.create(displayRanges);
    return this.displayRangeRepository.save(newDisplayRanges);
  }

  async update(id: number, displayRange: Partial<DisplayRange>): Promise<DisplayRange> {
    await this.displayRangeRepository.update(id, displayRange);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.displayRangeRepository.delete(id);
  }

  async updateImageUrl(id: number, imageUrl: string): Promise<DisplayRange> {
    await this.displayRangeRepository.update(id, { imageUrl });
    return this.findOne(id);
  }

  async getImageUrl(id: number): Promise<string | null> {
    const displayRange = await this.displayRangeRepository.findOne({
      where: { id },
      select: ['imageUrl'],
    });
    return displayRange?.imageUrl || null;
  }
}
