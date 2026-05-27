import { randomUUID } from "crypto";

interface UserSchema {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export class User {
  private readonly props: UserSchema;
  private readonly _id: string;

  constructor(props: UserSchema, id?: string) {
    this.props = props;
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }
}