import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TrackModule,
    FileModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
  ],
})
export class AppModule {}
