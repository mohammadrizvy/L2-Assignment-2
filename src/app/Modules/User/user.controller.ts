import { Request, Response } from 'express';
import { UserServices } from './user.service';

// !The controller will only handle applicatin logics

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      messsage: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err, "Couldn't create user");
  }
};

export const userControllers = {
  createUser,
};
