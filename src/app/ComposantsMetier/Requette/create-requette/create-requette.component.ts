import { Component, OnInit } from '@angular/core';
import {RequetteService} from "../service/requette.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";
import {valueOf} from "moment";

@Component({
  selector: 'app-create-requette',
  templateUrl: './create-requette.component.html',
  styleUrls: ['./create-requette.component.scss']
})
export class CreateRequetteComponent implements OnInit {
  requtte : Observable<Array<Requette>>
  createFormGroup : FormGroup;
  statusList = [
    {label: "NOUVELLE_FONCTIONNALITE", value:"NOUVELLE_FONCTIONNALITE"},
    {label: "CORRECTION_BUGS", value:"CORRECTION_BUGS"},
  ];
  constructor(
    private requetteService: RequetteService,
    private router : Router,
    private createFB : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createFormGroup = this.createFB.group({
      intitule : this.createFB.control(""),
      typeRequette : this.createFB.control(""),
      module : this.createFB.control(""),
      fonctionnalite : this.createFB.control(""),
      urgence : this.createFB.control(""),
      observation : this.createFB.control("")
    });
  }

  createRequtte() {
    let requette : Requette = this.createFormGroup.value;
    requette.date_creation = new Date();
    this.requetteService.createRequette(requette).subscribe({
      next: value => {
        this.router.navigateByUrl("/requettes")
      },
      error: err => {
        throwError(err)
      }
    });
  }
}
