import { Entry } from "./Entry";
import { Personal } from "./Personal";
import { Section } from "./Section";
import { Skill } from "./Skill";

export class Data {
  personal: Personal;
  sections: Array<Section>;
  skills: Array<Skill>;
  entries: Array<Entry>;

  constructor(
    personal: Personal,
    sections: Array<Section>,
    skills: Array<Skill>,
    entries: Array<Entry>
  ) {
    this.personal = personal;
    this.sections = sections;
    this.skills = skills;
    this.entries = entries;
  }
}

export const defaultData = new Data(
  { name: "", contacts: [], _links: [] },
  [],
  [],
  []
);
