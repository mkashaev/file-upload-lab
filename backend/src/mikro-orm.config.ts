import { UserEntity } from './user/user.entity';

console.log('env: ', process.env.NODE_ENV);
console.log('dbName: ', process.env.MONGO_DB_NAME);
console.log('url: ', process.env.MONGO_URL);

const config = {
  entities: [UserEntity],
  // entities: ['./dist/app/**/entities'],
  dbName: process.env.MONGO_DB_NAME || 'test2-db',
  type: 'mongo',
  clientUrl: process.env.MONGO_URL || 'mongodb://admin:pass123@localhost:27017',
};

export default config;
