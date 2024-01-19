import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

//* When the user hit the route it will call the controller function

router.post('/users', userControllers.createUser);

export const userRoutes = router;
