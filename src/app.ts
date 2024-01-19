import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/Modules/User/user.route';

const app: Application = express();

// Using parser from exprsss ;

app.use(express.json());
app.use(cors());

// This is application routes

app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('The server of Assignmet 2 is RUNNING');
});

// console.log(process.cwd());

export default app;
