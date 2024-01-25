export interface Entry {
  name: string;
  employer: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: Array<string>;
  section: string;
}
