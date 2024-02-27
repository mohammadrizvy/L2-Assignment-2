import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { TUpdateUser } from './user.interface';
// import { TUpdateUser } from './user.interface';

// !The controller will only handle applicatin logics

// !CREATING USERS TO DATABASE ;
const createUser = async (req: Request, res: Response) => {
  try {
    //*Validating data by using ZOD
    const { user: userData } = req.body;
    const zodparsedData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodparsedData);
    res.status(201).json({
      success: true,
      messsage: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found',
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
      message: 'Users is retrieved succesfully',
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

// ! UPDATING SINGLE USERS INFORMATION


const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updatedData: TUpdateUser = req.body;

    const result = await UserServices.updateSingleUserInDb(userId, updatedData);
    console.log(result);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
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



//! Delete a user from the database

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    await UserServices.DeleteSingleUser(userId);
    res.status(201).json({
      success: true,
      messsage: 'User deleted successfully!',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'User not found',
      error: err,
    });
  }
};
// !Add product to user's order array
const addProductToUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const productData = req.body;

    const result = await UserServices.addProductToUserOrders(
      userId,
      productData,
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
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

// ! Get all orders of the specifie user
const getAllOrdersOfUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const result = await UserServices.getAllOrdersOfUser(userId);

    if (result) {
      const { orders } = result;
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found or has no orders',
        error: {
          code: 404,
          description: 'User not found or has no orders',
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
 //! Calculating the total price of all orders 

 const getTotalPriceOfOrders = async (req: Request, res: Response) => {
   try {
     const userId = parseInt(req.params.userId, 10);
     const result = await UserServices.getTotalPriceOfOrders(userId);

     if (result !== null) {
       res.status(200).json({
         success: true,
         message: 'Total price calculated successfully!',
         data: {
           totalPrice: result,
         },
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
  deleteSingleUser,
  updateSingleUser,
  addProductToUserOrders,
  getAllOrdersOfUser,
  getTotalPriceOfOrders

};
