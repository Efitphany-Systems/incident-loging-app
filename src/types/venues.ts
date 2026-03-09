import { Image } from "./common";

export interface Venue {
  id: string;
  name: string;
  address: string;
  logo: Image[];
  additional_information: string;
}

export type Venues = Venue[];
