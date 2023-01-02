import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Track, TrackDocument } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.create(FileType.AUDIO, audio);
    const picturePath = this.fileService.create(FileType.IMAGE, picture);

    return this.trackModel.create({
      ...dto,
      audio: audioPath,
      picture: picturePath,
    });
  }

  async findAll(offset = 0, limit = 10): Promise<Track[]> {
    return this.trackModel.find().skip(offset).limit(limit);
  }

  async findByName(name: string): Promise<Track[]> {
    return this.trackModel.find({ name: { $regex: new RegExp(name) } });
  }

  async findById(id: ObjectId): Promise<Track> {
    return this.trackModel.findById(id);
  }

  async remove(id: ObjectId): Promise<ObjectId> {
    return this.trackModel.findByIdAndRemove(id);
  }
}
