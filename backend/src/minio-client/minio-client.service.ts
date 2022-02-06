import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import { config } from './config';
import { BufferedFile } from './file.model';

@Injectable()
export class MinioClientService {
  private readonly baseBucket = config.MINIO_BUCKET;

  constructor(private readonly minio: MinioService) {}

  public get client() {
    return this.minio.client;
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto.createHash('md5').update(temp_filename).digest('hex');
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;

    // this.client.putObject(baseBucket, fileName, fileBuffer, metaData, (err, res) => {
    //   if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    // });

    try {
      await this.client.putObject(baseBucket, fileName, fileBuffer, metaData);
    } catch (err) {
      console.log({ err });
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    return {
      url: `${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${config.MINIO_BUCKET}/${filename}`,
    };
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objetName, (err, res) => {
      if (err) throw new HttpException('Oops Something wrong happend', HttpStatus.BAD_REQUEST);
    });
  }
}
