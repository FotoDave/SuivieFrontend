import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TacheService} from "../service/tache.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tache} from "../model/tache.model";
import {Observable, throwError} from "rxjs";
import {RequetteService} from "../../Requette/service/requette.service";
import {CollaborateurService} from "../../Collaborateur/service/collaborateur.service";
import {Collaborateur} from "../../Collaborateur/model/collaborateur.model";
import {Requette} from "../../Requette/model/requette.model";
import {Commentaire} from "../Commentaire/model/commentaire.model";
import {CommentaireService} from "../Commentaire/service/commentaire.service";
import {formatDate} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FilesService} from "../../../Files/service/files.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-view-tache',
  templateUrl: './view-tache.component.html',
  styleUrls: ['./view-tache.component.scss']
})
export class ViewTacheComponent implements OnInit {
  idTache : number;
  fileCode : string;
  fileName : string;
  fileCodeCom: string;
  fileNameCom: string;
  idCollaborateur : number;
  idRequette : number;
  formGroup : FormGroup;
  taches : Observable<Tache>;
  tache : Tache
  collaborateur : Collaborateur;
  requette : Requette;
  commentaire : Observable<Array<Commentaire>>;
  constructor(
    private activateRoute : ActivatedRoute,
    private tacheService : TacheService,
    private commentaireService : CommentaireService,
    private requetteService : RequetteService,
    private collaborateurService : CollaborateurService,
    private modalService : NgbModal,
    private toastr : ToastrService,
    private formBuilder : FormBuilder,
    private fileService : FilesService
  ) { }

  ngOnInit(): void {
    this.getTache();
    this.getCommentaire();
  }

  badgeStatusTache(statusTache : string) {
    switch (statusTache) {
      case "NON_PLANIFIE": {
        return "badge badge-danger p-2";
      }
      case "PLANIFIE": {
        return "badge badge-warning p-2";
      }
      case "EN_COURS": {
        return "badge badge-primary p-2";
      }
      case "A_VALIDER_ALPHA": {
        return "badge badge-info p-2";
      }
      case "A_VALIDER_BETA": {
        return "badge badge-dark p-2";
      }
      case "TERMINE": {
        return "badge badge-success p-2";
      }
    }
  }
  public badgeStatusComm(status : string): string{
    switch (status) {
      case "NON_TRAITE":{
        return "badge badge-warning p-2";
      }
      case "TRAITE":{
        return "badge badge-success p-2";
      }
    }
  }

  getTache(){
    this.idTache = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.taches = this.tacheService.getOneTache(this.idTache).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des taches.")
      return throwError(err);
    }));
    this.taches.subscribe({
      next:value => {
        this.tache = value;
        this.requetteService.getOneRequette(value.requetteId).subscribe({
          next: value1 => {
            console.log(value1);
            this.requette = value1;
          },
          error: err => {
            console.log("Erreur lié à la recupération de la requette");
          }
        });
        this.collaborateurService.getOneCollaborateur(value.collaborateurId).subscribe({
          next: value2 => {
            console.log(value2);
            this.collaborateur = value2;
          },
          error: err => {
            console.log("Erreur lié à la recupération du collaborateur");
          }
        });
      },
      error:err => {
        console.log("Erreur lié à la recupération des taches");
      }
    });

    this.fileService.getOneFile("T", this.idTache).subscribe({
      next: value => {
        this.fileCode = value.fileCode;
        this.fileName = value.fileName.substring(11,value.fileName.length);
        /*console.log("Le nom du fichier enregistré est : ")
        console.log(this.fileName);*/
      },
      error:err => {
        console.log("Erreur lors de la récupération des informations du fichier");
      }
    });
  }

  getCommentaire(){
    this.commentaire = this.commentaireService.listeCommentaireParTaches(this.idTache).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des commentaires")
      return throwError(err);
    }));
  }

  openXlCommentaire(content){
    this.modalService.open(content, { size: 'xl' });
  }

  openXlModifier(contentModifier){
    this.modalService.open(contentModifier, { size: 'xl' });
  }

  openXlPlanifier(contentPlanifier){
    this.modalService.open(contentPlanifier, { size: 'xl' });
  }

  actualiser(){
    this.taches = this.tacheService.getOneTache(this.idTache).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des taches.")
      return throwError(err);
    }));
    this.taches.subscribe({
      next:value => {
        this.tache = value
      },
      error:err => {
        console.log("Erreur lors de la recupération de la tache");
      }
    })
  }
  actualiserCommentaire(){
    this.toastr.success("Commentaire enregistré", "Succès");
    this.commentaire = this.commentaireService.listeCommentaireParTaches(this.idTache).pipe(catchError(err => {
      console.log("Erreur lors de la récupération des commentaires")
      return throwError(err);
    }));
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

  file(id : number){
    this.fileService.getOneFile("C", id).subscribe({
      next: value => {
        this.fileCodeCom = value.fileCode;
        this.fileNameCom = value.fileName.substring(11,value.fileName.length);
        /*console.log("Le nom du fichier enregistré est : ")
        console.log(this.fileName);*/
      },
      error:err => {
        console.log("Erreur lors de la récupération des informations du fichier");
      }
    });
  }
}

