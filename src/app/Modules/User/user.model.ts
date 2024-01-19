import { Schema, model, connect } from 'mongoose';
import { User } from './user.interface';

const userSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});
