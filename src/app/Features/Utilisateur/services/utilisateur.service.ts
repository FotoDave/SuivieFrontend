import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(
    private http : HttpClient
  ) { }

  public listUsers() : Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.backendHost+"/users");
  }

  public createUser(user:User) : Observable<User>{
    return this.http.post<User>(environment.backendHost+"/users", user);
  }

  public removeRoleToUser(user : User){
    return this.http.put<User>(environment.backendHost+"/removeRole", user)
  }

}
