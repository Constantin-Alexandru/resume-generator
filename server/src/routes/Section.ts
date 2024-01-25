import express, { NextFunction, Request, Response } from 'express';
import { createSection, getAllSections } from '../controller/Section';
import { SectionInterface } from '../model/Section';
import IResponse from '../interfaces/IResponse';

const router = express.Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  createSection(name);

  res.status(200).send(new IResponse('success', null, true));
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
  const sections: Array<SectionInterface> = await getAllSections();

  res.status(200).send(new IResponse('success', sections, true));
});

export = router;
