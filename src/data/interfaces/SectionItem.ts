export default interface SectionItem {
  title: string;
  subtitle?: string;
  startDate: Date;
  endDate?: Date;
  section: string;
  description: string;
}

export function createSectionItem(
  title: string,
  section: string,
  description: string,
  startDate: Date,
  endDate?: Date,
  subtitle?: string
): SectionItem {
  return { title, subtitle, startDate, endDate, section, description };
}
