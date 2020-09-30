import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { indexTestRouter } from './routes/index';
import { newTestRouter } from './routes/new';


const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(indexTestRouter);
app.use(newTestRouter);

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send({});
});

export { app };