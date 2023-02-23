import { Component, OnInit } from '@angular/core';
import {RequetteService} from "../service/requette.service";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {ClientsService} from "../../Client/services/clients.service";
import {formatDate} from "@angular/common";
import {Client} from "../../Client/model/client.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilesService} from "../../../Files/service/files.service";

@Component({
  selector: 'app-view-requette',
  templateUrl: './view-requette.component.html',
  styleUrls: ['./view-requette.component.scss']
})
export class ViewRequetteComponent implements OnInit {
  requettes : Observable<Requette>;
  requette : Requette;
  client : Client;
  idRequette : number;
  fileCode : string;
  fileName : string;
  formFormGroup : FormGroup;
  closeResult : string;

  constructor(
    private requetteService : RequetteService,
    private clientService : ClientsService,
    private activedRoute : ActivatedRoute,
    private router : Router,
    private formFB : FormBuilder,
    private modalService : NgbModal,
    private fileService : FilesService
  ) { }

  ngOnInit(): void {
    this.idRequette = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.requettes = this.requetteService.getOneRequette(this.idRequette).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des taches.")
      return throwError(err);
    }));
    this.requettes.subscribe({
      next: value => {
        this.requette = value;
      },
      error: err => {
        throwError(err);
      }
    });
    this.fileService.getOneFile("R", this.idRequette).subscribe({
      next: value => {
        this.fileCode = value.fileCode;
        this.fileName = value.fileName.substring(11,value.fileName.length);
      },
      error:err => {
        console.log("Erreur lors de la récupération des informations du fichier");
      }
    });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  modifier(id: number) {
    this.router.navigateByUrl("requettes/modifier/"+id);
  }

  downloadFile(fileCode : string){
    this.fileService.downloadFile(fileCode).subscribe(response =>{
      let blob : Blob = response.body as Blob;
      let a = document.createElement('a');

      a.href = URL.createObjectURL(blob);
      a.download = this.fileName;
      a.click();

      URL.revokeObjectURL(URL.createObjectURL(blob));
    });
  }
  badgeStatusRequette(statusRequette : string) {
    switch (statusRequette) {
      case "NON_TRAITE": {
        return "badge badge-danger p-2";
      }
      case "EN_COURS": {
        return "badge badge-primary p-2";
      }
      case "TRAITE": {
        return "badge badge-success p-2";
      }
    }
  }

  actualiserRequette(){
    this.requettes = this.requetteService.getOneRequette(this.idRequette).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des taches.")
      return throwError(err);
    }));
    this.requettes.subscribe({
      next: value => {
        this.requette = value;
      },
      error: err => {
        throwError(err);
      }
    });
    this.fileService.getOneFile("R", this.idRequette).subscribe({
      next: value => {
        this.fileCode = value.fileCode;
        this.fileName = value.fileName.substring(11,value.fileName.length);
      },
      error:err => {
        console.log("Erreur lors de la récupération des informations du fichier");
      }
    });
  }
}
