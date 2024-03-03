import { ObjectId } from "mongodb";

export class User {
  id: ObjectId | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor() {}
}
