import { Pair } from '../interfaces/Pair';
import Logging from '../libraries/Logging';
import Personal, { PersonalInterface } from '../model/Personal';

export function createPersonal(
  name: string,
  contacts: Array<Pair>,
  _links: Array<Pair>
) {
  const personal = new Personal({ name, contacts, _links });

  personal.save().then().catch(Logging.error);
}

export async function getAllPersonals(): Promise<Array<PersonalInterface>> {
  return await Personal.find();
}
