import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
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
    /*const boundary = `----WebKitFormBoundary${Math.random().toString(36).substr(2)}`;
    const headers = new HttpHeaders({
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    });*/
    return this.http.post<Fichier>(environment.backendHost+'/file', formData);
  }

  public downloadFile(fileCode : string): Observable<HttpEvent<Blob>>{
    return this.http.get(environment.backendHost+'/files/'+fileCode, {
      reportProgress : true,
      observe : 'events',
      responseType : 'blob'
    });
  }
}
