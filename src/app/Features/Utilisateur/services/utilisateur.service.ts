import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {environment} from "../../../../environments/environment";
import {AppUser} from "../../../Authentication/model/appUser.model";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(
    private http : HttpClient
  ) { }

  public listUsers() : Observable<Array<AppUser>>{
    return this.http.get<Array<AppUser>>(environment.backendHost+"/users");
  }

  public createUser(appUser:AppUser) : Observable<AppUser>{
    return this.http.post<AppUser>(environment.backendHost+"/users", appUser);
  }

  public removeRoleToUser(appUser : AppUser){
    return this.http.put<AppUser>(environment.backendHost+"/removeRole", appUser)
  }

  public editUser(appUser : AppUser){
    return this.http.put<AppUser>(environment.backendHost+"/editUser", appUser)
  }

}
