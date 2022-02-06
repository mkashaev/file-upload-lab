import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    const uploadedImage = await this.minioClientService.upload(image);

    return {
      imageUrl: uploadedImage.url,
      message: 'Success',
    };
  }
}
