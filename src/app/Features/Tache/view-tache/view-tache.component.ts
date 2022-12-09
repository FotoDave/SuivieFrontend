import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TacheService} from "../service/tache.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Tache} from "../model/tache.model";
import {throwError} from "rxjs";
import {RequetteService} from "../../Requette/service/requette.service";
import {CollaborateurService} from "../../Collaborateur/service/collaborateur.service";
import {Collaborateur} from "../../Collaborateur/model/collaborateur.model";
import {Requette} from "../../Requette/model/requette.model";
import {Commentaire} from "../Commentaire/model/commentaire.model";
import {CommentaireService} from "../Commentaire/service/commentaire.service";
import {formatDate} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-tache',
  templateUrl: './view-tache.component.html',
  styleUrls: ['./view-tache.component.scss']
})
export class ViewTacheComponent implements OnInit {
  idTache : number;
  idCollaborateur : number;
  idRequette : number;
  formGroup : FormGroup;
  taches : Tache;
  collaborateur : Collaborateur;
  requette : Requette;
  commentaire : Array<Commentaire>;
  constructor(
    private activateRoute : ActivatedRoute,
    private tacheService : TacheService,
    private commentaireService : CommentaireService,
    private requetteService : RequetteService,
    private collaborateurService : CollaborateurService,
    private modalService : NgbModal,
    private toastr : ToastrService,
    private formBuilder : FormBuilder
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
    this.tacheService.getOneTache(this.idTache).subscribe({
      next:value => {
        this.taches = value;
        console.log("----Taches-----");
        console.log(this.taches);
        this.requetteService.getOneRequette(value.requetteId).subscribe({
          next: value1 => {
            console.log(value1);
            this.requette = value1;
          },
          error: err => {
            console.log("Erreur lié à la recupération de la requette");
            /*throwError(err);*/
          }
        });
        this.collaborateurService.getOneCollaborateur(value.collaborateurId).subscribe({
          next: value2 => {
            console.log(value2);
            this.collaborateur = value2;
          },
          error: err => {
            console.log("Erreur lié à la recupération du collaborateur");
            /*throwError(err);*/
          }
        });
      },
      error:err => {
        console.log("Erreur lié à la recupération des taches");
        /*throwError(err);*/
      }
    });
  }

  getCommentaire(){
    this.commentaireService.listeCommentaireParTaches(this.idTache).subscribe({
      next:value => {
        this.commentaire = value;
      },
      error:err => {
        console.log("Erreur lié à la recupération de la liste des commentaires");
        throwError(err);
      }
    });
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
    //this.getTache();
    window.location.reload();
    this.toastr.success("", "Succès");
  }
}

