import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: { type: String },
});

const addressSchema = new Schema<TAddress>(
  {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { _id: false },
);

const ordersSchema = new Schema(
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },

  fullName: fullNameSchema,

  age: { type: Number },
  email: { type: String, unique: true },
  isActive: { type: Boolean },
  hobbies: { type: [String], required: true },
  address: addressSchema,

  orders: [ordersSchema],
  isDeleted: { type: Boolean, default: false },
});

// !Utilizing the bcrypt algorithm for hashing the password
// *Pre save
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// *Post save
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// !Statics

//* Creating static for create new user !

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};
// *Creating statics for finding single user!
userSchema.statics.getSingleUserById = async function (userId: number) {
  const getSingleUser = await this.findOne({ userId });
  return getSingleUser;
};

// userSchema.statics.updateUserById = async function (userId: number, newUser : TUser ) {
//   const result = await User.findByIdAndUpdate(userId, newUser, {
//     new: true,
//   });
//   return result;
// }

userSchema.statics.deleteUserById = async function (userId: number) {
  const result = await this.deleteOne({ userId });

  // If the result.deletedCount is greater than 0, it means a document was deleted
  return result.deletedCount > 0;
};

export const User = model<TUser, UserModel>('User', userSchema);
