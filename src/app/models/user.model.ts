import {
  Address
} from './address.model';

import {
  Company
} from './company.model';

export class UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  /**
   *
   */
  constructor(data: {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    address?: Address;
    phone?: string;
    website?: string;
    company?: Company;
  }= {}) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.address = data.address;
    this.phone = data.phone;
    this.website = data.website;
    this.company = data.company;
  }
}
