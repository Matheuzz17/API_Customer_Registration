import { randomUUID } from 'crypto';

interface AddressSchema {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  userId: string;
}

export class Address {
  private readonly props: AddressSchema;
  private readonly _id: string;

  constructor(props: AddressSchema, id?: string) {
    this.props = props;
    this._id = id || randomUUID();
  }

  get id(): string { return this._id; }

  get street(): string {
     return this.props.street; 
    }

  set street(street: string) {
     this.props.street = street; }

  get number(): string { 
    return this.props.number; }

  set number(number: string) { 
    this.props.number = number; }

  get district(): string {
     return this.props.district; }

  set district(district: string) 
  { this.props.district = district; }

  get city(): string { 
    return this.props.city; }

  set city(city: string) 
  { this.props.city = city; }

  get state(): string { 
    return this.props.state; }
    
  set state(state: string) {
     this.props.state = state; }

  get zipCode(): string { 
    return this.props.zipCode; }

  set zipCode(zipCode: string) { 
    this.props.zipCode = zipCode; }

  get userId(): string {
     return this.props.userId; }

  set userId(userId: string) { 
    this.props.userId = userId; }
}