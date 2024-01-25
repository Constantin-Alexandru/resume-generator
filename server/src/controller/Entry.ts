import Logging from '../libraries/Logging';
import Entry, { EntryInterface } from '../model/Entry';

export function createEntry(
  name: string,
  description: string,
  skills: Array<string>,
  section: string,
  startDate: Date,
  endDate?: Date
): void {
  const entry = new Entry({
    name,
    description,
    skills,
    section,
    startDate,
    endDate,
  });

  entry.save().then().catch(Logging.error);
}

export async function getAllEntries(): Promise<Array<EntryInterface>> {
  return await Entry.find();
}
