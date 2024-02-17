import { Model } from 'mongoose';
// interface for User

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = Array<{
  productName: string;
  price: number;
  quantity: number;
}>;

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrders;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId:number):Promise<TUser | null>
}
