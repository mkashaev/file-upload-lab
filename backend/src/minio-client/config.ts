export const config = {
  MINIO_ENDPOINT: process.env.MINIO_ENDPOINT || 'minio',
  MINIO_PORT: Number(process.env.MINIO_PORT) || 9000,
  MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY || 'minio',
  MINIO_SECRETKEY: process.env.MINIO_SECRETKEY || 'minio123',
  MINIO_BUCKET: process.env.MINIO_BUCKET || 'files',
};
