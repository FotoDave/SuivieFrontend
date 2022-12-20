import {Role} from "./appRole.model";

export interface AppUserDtoModel {
  id : number;
  username : string;
  password : string;
  appRoles : Array<Role>;

}
