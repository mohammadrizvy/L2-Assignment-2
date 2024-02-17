import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

// !The controller will only handle applicatin logics

// !CREATING USERS TO DATABASE ;
const createUser = async (req: Request, res: Response) => {
  try {
    //*Validating data by using ZOD
    const { user: userData } = req.body;
    const zodparsedData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodparsedData);
    res.status(200).json({
      success: true,
      messsage: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// ! GETTING ALL THE USERS FROM DATABASE ;
const retriveAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.retrieveAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};
// !GETTING A SINGLE USER FROM DATABASE USING :ID ;

const retrieveSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.retrieveSingleUserByIdFromDB(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: {
        code: 500,
        description: 'Internal server error',
      },
    });
  }
};


export const userControllers = {
  createUser,
  retriveAllUsers,
  retrieveSingleUser,
};
