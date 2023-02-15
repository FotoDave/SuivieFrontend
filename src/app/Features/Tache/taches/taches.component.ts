import { Component, OnInit } from '@angular/core';
import {TacheService} from "../service/tache.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {Requette} from "../../Requette/model/requette.model";
import {RequetteService} from "../../Requette/service/requette.service";
import {SearchTache} from "../model/searchTache.model";
import {Tache} from "../model/tache.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})
export class TachesComponent implements OnInit {
  formGroup : FormGroup;
  badge : string;
  itemsRequette = [];
  itemsStatus = [
    { valueS: "NON_PLANIFIE", labelS: "NON_PLANIFIE" },
    { valueS: "PLANIFIE", labelS: "PLANIFIE" },
    { valueS: "EN_COURS", labelS: "EN_COURS" },
    { valueS: "A_VALIDER_ALPHA", labelS: "A_VALIDER_ALPHA" },
    { valueS: "A_VALIDER_BETA", labelS: "A_VALIDER_BETA" },
    { valueS: "TERMINE", labelS: "TERMINE" }
  ];
  requette : Array<Requette>;
  taches : Observable<Array<Tache>>;
  constructor(
    private tacheService : TacheService,
    private formBuilder : FormBuilder,
    private requetteService : RequetteService,
    private modalService : NgbModal,
    private route : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.requetteService.getRequttes().subscribe({
      next: value => {
        this.requette = value;
      },
      error: err => {
        throwError(err)
      }
    });

    this.taches = this.tacheService.listeTaches().pipe(catchError(err => {
      console.log("Erreur lors de la recupération des taches");
      return throwError(err);
    }));

    this.formGroup = this.formBuilder.group({
      requetteId:this.formBuilder.control(""),
      statusTache:this.formBuilder.control("")
    });
  }

  searchTache(){
    let search : SearchTache = this.formGroup.value;
    this.taches = this.tacheService.searchTacheByRequetteIdOrStatusTache(search).pipe(catchError(err => {
      console.log("Erreur lors de la récupération de la liste des taches");
      return throwError(err);
    }));
  }

  badgeStatus(statusTache : string){
    switch (statusTache) {
      case "NON_PLANIFIE":{
        return "badge badge-danger p-2";
      }
      case "PLANIFIE":{
        return "badge badge-warning p-2";
      }
      case "EN_COURS":{
        return "badge badge-primary p-2";
      }
      case "A_VALIDER_ALPHA":{
        return "badge badge-info p-2";
      }
      case "A_VALIDER_BETA":{
        return "badge badge-dark p-2";
      }
      case "TERMINE":{
        return "badge badge-success p-2";
      }
    }
  }
  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  detailsTache(id : number){
    this.route.navigateByUrl("taches/consulter/"+id);
  }

  actualiser(){
    this.taches = this.tacheService.listeTaches().pipe(catchError(err => {
      console.log("Erreur lors de la recupération des taches");
      return throwError(err);
    }));
  }

}
