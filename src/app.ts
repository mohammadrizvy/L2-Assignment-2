import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Using parser from exprsss ;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('The server of Assignmet 2 is RUNNING');
});

// console.log(process.cwd());

export default app;
