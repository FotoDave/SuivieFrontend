import { Component, OnInit } from '@angular/core';
import {Requette} from "../model/requette.model";
import {Observable, throwError} from "rxjs";
import {RequetteService} from "../service/requette.service";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import TableToExcel from '@linways/table-to-excel';

@Component({
  selector: 'app-requettes',
  templateUrl: './requettes.component.html',
  styleUrls: ['./requettes.component.scss']
})
export class RequettesComponent implements OnInit {
  requette : Observable<Array<Requette>>;
  requetteId : number;
  constructor(
    private requetteService : RequetteService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.requette = this.requetteService.getRequttes().pipe(
      catchError(err => {
        return throwError(err)
      })
    );
  }

  viewRequette(id : number) {
    this.router.navigateByUrl("requettes/consulter/"+id);
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

  infoRequette(id: number) {
    this.router.navigateByUrl("requettes/modifier/"+id);
  }

  exportFilesToExcel(){
    let table = document.getElementById("tableRequettes");
    TableToExcel.convert(table, {
      name: "ListesRequettes.xlsx",
      sheet: {
        name: "Feuille 1"
      }
    });
  }

}
