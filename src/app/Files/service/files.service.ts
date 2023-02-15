import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fichier} from "../model/file.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(
    private http : HttpClient
  ) { }

  public uploadFiles(formData : FormData): Observable<Fichier>{
    return this.http.post<Fichier>(environment.backendHost+'/file', formData);
  }

  public downloadFile(fileCode : string){
    return this.http.get(environment.backendHost+'/files/'+fileCode, {
      observe : 'response',
      responseType : 'blob'
    });
      /*
        public downloadFile(fileCode : string): Observable<HttpEvent<Blob>>{
        {
        reportProgress : true,
        observe : 'events',
        responseType : 'blob'
      }*/
  }

  public getOneFile(element : string, id : number):Observable<Fichier>{
    let params = new HttpParams().set('id', id.toString())
      .set('element', element);
    return this.http.get<Fichier>(environment.backendHost+"/file", {
      params: params
    });
  }
}
