import { DataSource } from 'typeorm';
import { DisplayRange } from './display-range.entity';

export async function seedDisplayRanges(dataSource: DataSource) {
  const displayRangeRepository = dataSource.getRepository(DisplayRange);

  // 기존 데이터 확인
  const existingCount = await displayRangeRepository.count();
  if (existingCount > 0) {
    console.log('Display ranges already exist. Skipping seed.');
    return;
  }

  // 초기 데이터
  const displayRanges = [
    { x: 399.80, y: 100, zMin: -274.61, zMax: 639.90, imageUrl: null },
    { x: 11.43, y: 100, zMin: 280.41, zMax: 522.19, flip: true, imageUrl: null },
    { x: -11.43, y: 100, zMin: 280.41, zMax: 522.19, flip: true, imageUrl: null },
    { x: 11.43, y: 100, zMin: -115.60, zMax: 124.89, flip: true, imageUrl: null },
    { x: -11.43, y: 100, zMin: -115.60, zMax: 124.89, flip: true, imageUrl: null },
    { x: 11.43, y: 100, zMin: -517.97, zMax: -279.49, flip: true, imageUrl: null },
    { x: -11.43, y: 100, zMin: -517.97, zMax: -279.49, flip: true, imageUrl: null },
    { x: -399.45, y: 100, zMin: -745.26, zMax: 722.95, imageUrl: null },
  ];

  const entities = displayRangeRepository.create(displayRanges);
  await displayRangeRepository.save(entities);
  console.log(`Seeded ${displayRanges.length} display ranges.`);
}
