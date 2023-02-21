import {Role} from "../../Features/Utilisateur/model/appRole.model";

export interface AppUser{
  id : number;
  username : string;
  password : string;
  roles : Array<string>;
  roleName : string;
  clientId : number;
  nomClient : string;
}
