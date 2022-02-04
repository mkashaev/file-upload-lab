import {
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  BeforeCreate,
  Entity,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

abstract class BaseEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}

@Entity()
export class UserEntity extends BaseEntity {
  @Property()
  email: string;

  @Property()
  username: string;
}
