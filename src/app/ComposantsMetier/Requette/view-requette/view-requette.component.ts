import { Component, OnInit } from '@angular/core';
import {RequetteService} from "../service/requette.service";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-view-requette',
  templateUrl: './view-requette.component.html',
  styleUrls: ['./view-requette.component.scss']
})
export class ViewRequetteComponent implements OnInit {
  requette : Observable<Requette>;
  idRequette : number;
  formFormGroup : FormGroup;
  constructor(
    private requetteService : RequetteService,
    private activedRoute : ActivatedRoute,
    private formFB : FormBuilder
  ) { }

  ngOnInit(): void {
    this.idRequette = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.requetteService.getOneRequette(this.idRequette).subscribe({
        next: value => {
          this.formFormGroup = this.formFB.group({
            id : this.formFB.control(value.id),
            intitule : this.formFB.control(value.intitule),
            date : this.formFB.control(value.date),
            module : this.formFB.control(value.module),
            fonctionalite : this.formFB.control(value.fonctionalite),
            urgence : this.formFB.control(value.urgence),
            observation : this.formFB.control(value.observation),
            type : this.formFB.control(value.type)
          })
        },
        error: err => {
          throwError(err);
        }
      });
  }

}
