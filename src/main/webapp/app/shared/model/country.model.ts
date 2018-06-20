import { IRegion } from './region.model';

export interface ICountry {
  id?: number;
  countryName?: string;
  region?: IRegion;
}

export class Country implements ICountry {
  constructor(public id?: number, public countryName?: string, public region?: IRegion) {}
}
