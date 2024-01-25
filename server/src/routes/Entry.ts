import express, { NextFunction, Request, Response } from 'express';
import { createEntry, getAllEntries } from '../controller/Entry';
import IResponse from '../interfaces/IResponse';
import { EntryInterface } from '../model/Entry';

const router = express.Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { name, description, skills, section, startDate, endDate } = req.body;

  createEntry(name, description, skills, section, startDate, endDate);

  res.status(200).send(new IResponse('success', null, true));
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
  const entries: Array<EntryInterface> = await getAllEntries();

  res.status(200).send(new IResponse('success', entries, true));
});

export = router;
