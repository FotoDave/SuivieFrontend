import {Role} from "./appRole.model";

export interface User {
  id : number;
  username : string;
  password : string;
  roleName : string;
}
