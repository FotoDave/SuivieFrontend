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

@Component({
  selector: 'app-view-requette',
  templateUrl: './view-requette.component.html',
  styleUrls: ['./view-requette.component.scss']
})
export class ViewRequetteComponent implements OnInit {
  requette : Requette;
  client : Client;
  idRequette : number;
  formFormGroup : FormGroup;
  closeResult : string;

  constructor(
    private requetteService : RequetteService,
    private clientService : ClientsService,
    private activedRoute : ActivatedRoute,
    private router : Router,
    private formFB : FormBuilder,
    private modalService : NgbModal
  ) { }

  ngOnInit(): void {
    this.idRequette = Number(this.activedRoute.snapshot.paramMap.get('id'));
    this.requetteService.getOneRequette(this.idRequette).subscribe({
      next: value => {
        this.requette = value;/*
          this.formFormGroup = this.formFB.group({
          nomClient: this.formFB.control(value.nomClient),
          date_creation: this.formFB.control(value.date_creation),
          nomClient: this.formFB.control(value.nomClient),
        })*/
      },
      error: err => {
        throwError(err);
      }
    });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  modifier(id: number) {
    this.router.navigateByUrl("requettes/modifier/"+id);
  }

  delete(requette: Requette) {
    this.requetteService.deleteRequtte(this.idRequette).subscribe({
      next: value => {
        this.router.navigateByUrl("requettes")
      },
      error: err => throwError(err)
    });
  }

  creerTache() {

  }
}
