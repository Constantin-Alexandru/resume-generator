import express, { NextFunction, Request, Response } from 'express';
import { createPersonal, getAllPersonals } from '../controller/Personal';
import { PersonalInterface } from '../model/Personal';
import IResponse from '../interfaces/IResponse';

const router = express.Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { name, contacts, _links } = req.body;

  createPersonal(name, contacts, _links);

  res.status(200).send(new IResponse('success', null, true));
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
  const personals: Array<PersonalInterface> = await getAllPersonals();

  res.status(200).send(new IResponse('success', personals, true));
});

export = router;
