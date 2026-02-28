import { DataSource } from 'typeorm';
import { seedDisplayRanges } from './display-range/display-range.seed';
import { DisplayRange } from './display-range/display-range.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'gemini_hack',
  entities: [DisplayRange],
  synchronize: true,
});

async function runSeed() {
  try {
    await dataSource.initialize();
    console.log('Database connection established.');

    await seedDisplayRanges(dataSource);

    await dataSource.destroy();
    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

runSeed();
