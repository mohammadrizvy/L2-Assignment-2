import { TOrders, TUpdateUser, TUser } from './user.interface';
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

  // // Assuming User.updateSingleUser returns a model instance or query builder

  //   const selectedUser = await result.select({
  //     username: 1,
  //     fullName: 1,
  //     age: 1,
  //     email: 1,
  //     address: 1,
  //     userId: 1,
  //   });

  return result;
};

// ! Delete User

const DeleteSingleUser = async (userId: number): Promise<boolean> => {
  const result = await User.deleteOne({ userId });
  return result.deletedCount !== 0;
};

// ! Adding a new product to order

const addProductToUserOrders = async (
  userId: number,
  productData: TOrders,
): Promise<TUser | null> => {
  const result = await User.addProductToUserOrders(userId, productData);
  return result;
};
// ! Get all orders of a user
const getAllOrdersOfUser = async (userId: number): Promise<TUser | null> => {
  const result = await User.getAllOrdersOfUser(userId);
  return result;
};

//!Total price of orders

const getTotalPriceOfOrders = async (
  userId: number,
): Promise<number | null> => {
  const result = await User.getTotalPriceOfUserOrders(userId);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  retrieveAllUserFromDB,
  retrieveSingleUserByIdFromDB,
  DeleteSingleUser,
  updateSingleUserInDb,
  addProductToUserOrders,
  getAllOrdersOfUser,
  getTotalPriceOfOrders
};
