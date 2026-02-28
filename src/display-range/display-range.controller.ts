import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DisplayRangeService } from './display-range.service';
import { DisplayRange } from './display-range.entity';
import { multerConfig } from './interceptors/file-upload.interceptor';

@Controller('display-ranges')
export class DisplayRangeController {
  constructor(private readonly displayRangeService: DisplayRangeService) {}

  @Get()
  async findAll(): Promise<DisplayRange[]> {
    return this.displayRangeService.findAll();
  }

  @Get(':id/image-url')
  async getImageUrl(@Param('id', ParseIntPipe) id: number): Promise<{ imageUrl: string | null }> {
    const imageUrl = await this.displayRangeService.getImageUrl(id);
    return { imageUrl };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DisplayRange> {
    return this.displayRangeService.findOne(id);
  }

  @Post()
  async create(@Body() displayRange: Partial<DisplayRange>): Promise<DisplayRange> {
    return this.displayRangeService.create(displayRange);
  }

  @Post('bulk')
  async createMany(@Body() displayRanges: Partial<DisplayRange>[]): Promise<DisplayRange[]> {
    return this.displayRangeService.createMany(displayRanges);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() displayRange: Partial<DisplayRange>,
  ): Promise<DisplayRange> {
    return this.displayRangeService.update(id, displayRange);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.displayRangeService.remove(id);
  }

  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DisplayRange> {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const imageUrl = `/uploads/images/${file.filename}`;
    return this.displayRangeService.updateImageUrl(id, imageUrl);
  }
}
