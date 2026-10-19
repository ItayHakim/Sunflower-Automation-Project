 import { v4 as uuidv4 } from "uuid";
 import { UserDetailsType } from "../models/registerTypes";
 export const userRegisterDetails:UserDetailsType = {
  firstName: "johnny",
  lastName: "Test",
  email: `johnny.test+${uuidv4()}@example.com`,
  password: "Test1234",
  confirmPassword: "Test1234"
};
