import {  TUpdateUser, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('This User Already Exists');
  }
  const result = await User.create(userData);

  return result;
};

const retrieveAllUserFromDB = async () => {
  //!Using select method form mongoose to show the only the specific data of a user ;
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    userId: 1,
  });
  return result;
};

// !Retrieveing a single user form DATABASE

const retrieveSingleUserByIdFromDB = async (userId: number) => {
  const result = await User.getSingleUserById(userId);
  return result;
};

// ! Updating users information
const updateSingleUserInDb = async (
  userId: number,
  updatedData: TUpdateUser,
): Promise<TUser | null> => {
  const result = await User.updateSingleUser(userId, updatedData);

  return result;
};

// ! Delete User

const DeleteSingleUser = async (userId: number): Promise<boolean> => {
  const result = await User.deleteOne({ userId });

  return result.deletedCount !== 0;
};


export const UserServices = {
  createUserIntoDB,
  retrieveAllUserFromDB,
  retrieveSingleUserByIdFromDB,
  DeleteSingleUser,
  updateSingleUserInDb
};
