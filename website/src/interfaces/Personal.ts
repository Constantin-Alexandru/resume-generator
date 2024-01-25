import { Link } from "./Link";

export interface Personal {
  name: string;
  contacts: Array<Link>;
  _links: Array<Link>;
}
