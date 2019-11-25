import {
  Geo
} from './geo.model';

export class Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
  /**
   *
   */
  constructor(data: {
    street ?: string;
    suite ?: string;
    city ?: string;
    zipcode ?: string;
    geo ?: Geo;
  } = {}) {
    this.street = data.street;
    this.suite = data.suite;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.geo = data.geo;
  }
}
