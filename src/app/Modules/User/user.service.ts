import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const retrieveAllUserFromDB = async() => {
 const result = await UserModel.find().select(
   'username fullName age email address',
 );
    return result; 
}

export const UserServices = {
  createUserIntoDB,
  retrieveAllUserFromDB
};
