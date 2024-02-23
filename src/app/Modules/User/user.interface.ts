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
  totalPrice?: number;
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
  orders : TOrders;
  isDeleted: boolean;
};

export type TUpdateUser = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: TFullName;
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: TAddress;
  orders?: TOrders;
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  getSingleUserById(userId: number): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  deleteUserById(userId: number): Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  updateSingleUser(userId: number,userData: TUpdateUser,): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  addProductToUserOrders(userId: number,productData: TOrders,): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  getAllOrdersOfUser(userId: number): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  getTotalPriceOfUserOrders(userId: number): Promise<number>;
}
