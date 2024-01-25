import { NextFunction, Request, Response } from 'express';
import Logging from '../libraries/Logging';
import Section, { SectionInterface } from '../model/Section';

export function createSection(name: string) {
  const section = new Section({ name });

  section.save().then().catch(Logging.error);
}

export async function getAllSections(): Promise<Array<SectionInterface>> {
  return await Section.find();
}
