import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// ?When the user hit the route it will call the controller function

// ?This route is for creating new user 
router.post('/users', userControllers.createUser);

// ?This route is for retriving all users
router.get('/users', userControllers.retriveAllUsers);

// ?This route is for retriveing a single user 
router.get('/users/:userId', userControllers.retrieveSingleUser);

// ?This route is for updating a users informaiton 

router.put('/users/:userId', userControllers.updateSingleUser);

// ?This route is for deleting a users 
router.delete('/users/:userId', userControllers.deleteSingleUser);

//? Route for adding a new product to user's orders
router.put('/users/:userId/orders', userControllers.addProductToUserOrders);
// ? This route is for getting all orders of a user
router.get('/users/:userId/orders', userControllers.getAllOrdersOfUser);
// ? This route is for calculating the total number of orders
router.get('/users/:userId/orders/total-price',userControllers.getTotalPriceOfOrders);


export const userRoutes = router;


