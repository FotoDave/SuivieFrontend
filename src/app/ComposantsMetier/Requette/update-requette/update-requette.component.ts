import { Component, OnInit } from '@angular/core';
import {RequetteService} from "../service/requette.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";

@Component({
  selector: 'app-update-requette',
  templateUrl: './update-requette.component.html',
  styleUrls: ['./update-requette.component.scss']
})
export class UpdateRequetteComponent implements OnInit {
  requette : Requette;
  updateFormGroup : FormGroup;
  idRequette : number;
  statusList = [
    {label: "NOUVELLE_FONCTIONNALITE", value:"NOUVELLE_FONCTIONNALITE"},
    {label: "CORRECTION_BUGS", value:"CORRECTION_BUGS"},
  ];

  constructor(
    private requetteService : RequetteService,
    private activatedRoute : ActivatedRoute,
    private route : Router,
    private updateFB : FormBuilder
  ) { }

  ngOnInit(): void {
   this.idRequette = Number(this.activatedRoute.snapshot.paramMap.get('id'));
   this.requetteService.getOneRequette(this.idRequette).subscribe({
     next: value => {
       this.requette = value;
       this.updateFormGroup = this.updateFB.group({
         intitule : this.updateFB.control(value.intitule),
         typeRequette : this.updateFB.control(value.typeRequette),
         module : this.updateFB.control(value.module),
         fonctionnalite : this.updateFB.control(value.fonctionnalite),
         urgence : this.updateFB.control(value.urgence),
         observation : this.updateFB.control(value.observation)
       })
     },
     error: err => {
       throwError(err);
     }
   })
  }

  updateRequtte() {
    let envoie : Requette = this.updateFormGroup.value;
    envoie.clientId = this.requette.clientId;
    envoie.date_creation = this.requette.date_creation;
    this.requetteService.modifierRequette(envoie, this.idRequette).subscribe({
      next: value => {this.route.navigateByUrl("/requettes")},
      error: err => {throwError(err)}
    });
  }
}
