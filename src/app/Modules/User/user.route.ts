import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

//* When the user hit the route it will call the controller function

// ?This route is for creating new user 
router.post('/users', userControllers.createUser);

// ?This route is for retriving all users
router.get('/users', userControllers.retriveAllUsers);

// ?This route is for retriveing a single user 
router.get('/users/:userId', userControllers.retrieveSingleUser);

// ?This route is for updating a users informaiton 
router.put("/users/:userId" , userControllers.updateSingleUsersInfo)

// ?This route is for deleting a users 
router.delete('/users/:userId', userControllers.deleteSingleUser);

export const userRoutes = router;


