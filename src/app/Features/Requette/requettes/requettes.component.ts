import { Component, OnInit } from '@angular/core';
import {Requette} from "../model/requette.model";
import {Observable, throwError} from "rxjs";
import {RequetteService} from "../service/requette.service";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-requettes',
  templateUrl: './requettes.component.html',
  styleUrls: ['./requettes.component.scss']
})
export class RequettesComponent implements OnInit {
  requette : Observable<Array<Requette>>;
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

  infoRequette(id: number) {
    this.router.navigateByUrl("requettes/modifier/"+id);
  }

  /*deleteRequette(r: Requette) {
    this.requetteService.deleteRequtte(r.id).subscribe({
      next: value => {
        this.requette = this.requette.pipe(
          map(data => {
            let index = data.indexOf(r);
            data.slice(index,1);
            return data
          })
        )
      },
      error: err => {
        return throwError(err);
      }
    })
  }*/
}
