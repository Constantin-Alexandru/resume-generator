import express, { NextFunction, Request, Response } from 'express';
import { createSkill, getAllSkills } from '../controller/Skill';
import { SkillInterface } from '../model/Skill';
import IResponse from '../interfaces/IResponse';

const router = express.Router();

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  const { name, type } = req.body;

  createSkill(name, type);

  res.status(200).send(new IResponse('success', null, true));
});

router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
  const skills: Array<SkillInterface> = await getAllSkills();

  res.status(200).send(new IResponse('success', skills, true));
});

export = router;
