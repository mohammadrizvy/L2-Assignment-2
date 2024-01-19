import { Schema, model } from 'mongoose';
import { Address, FullName,User } from './user.interface';

// TODO : ZOD Validation isn't dont yet !

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const ordersSchema = new Schema({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },

  fullName: fullNameSchema,

  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String], required: true },
  address: addressSchema,

  orders: [ordersSchema],
});

export const UserModel = model<User>('User', userSchema);
