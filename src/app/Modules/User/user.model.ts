import { Schema, model, connect } from 'mongoose';
import { Address, FullName, Orders, User } from './user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const ordersSchema = new Schema<Orders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
]);

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

  orders: ordersSchema,
});


const User = model<User>('User', userSchema);
