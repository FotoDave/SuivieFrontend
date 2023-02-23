import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Requette} from "../model/requette.model";
import {Tache} from "../../Tache/model/tache.model";
import {TacheService} from "../../Tache/service/tache.service";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  formGroup : FormGroup;
  selectedId : number;
  @Input()
  requette : Requette;
  items = [];
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();
  @Input()
  modal: any;
  constructor(
    private modalService : NgbModal,
    private formBuilder : FormBuilder,
    private tacheService : TacheService,
    private router : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.items = [
      { id1: this.requette.id, name: this.requette.intitule }
    ];
    this.selectedId = this.items[0].id1;
    this.formGroup = this.formBuilder.group({
      requetteId : this.formBuilder.control(""),
      intitule : this.formBuilder.control(""),
      observation : this.formBuilder.control(""),
    });
  }

    creerTache() {
    let tache: Tache = this.formGroup.value;
    this.tacheService.creerTache(tache).subscribe({
      next : value => {
        this.toastr.success("Création Tâche", "Succès");
        this.actualisation.emit();
        this.modal.close();
      },
      error : err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
    }
}
