import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Track, TrackSchema } from './schemas/track.schema';
import { FileService } from '../file/file.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FileService],
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
})
export class TrackModule {}
