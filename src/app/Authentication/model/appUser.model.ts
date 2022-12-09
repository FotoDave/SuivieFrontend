import {AppRole} from "./appRoles";

export interface AppUser{
  id : number;
  username : string;
  password : string;
  appRoles : Array<AppRole>;
}
