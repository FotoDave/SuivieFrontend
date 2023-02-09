import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TacheService} from "../service/tache.service";
import {RequetteService} from "../../Requette/service/requette.service";
import {Requette} from "../../Requette/model/requette.model";
import {throwError} from "rxjs";
import {Tache} from "../model/tache.model";
import {ToastrService} from "ngx-toastr";
import {FilesService} from "../../../Files/service/files.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-tache',
  templateUrl: './create-tache.component.html',
  styleUrls: ['./create-tache.component.scss']
})
export class CreateTacheComponent implements OnInit {
  @Input()
  modal : any;
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();
  formGroup : FormGroup;
  requettes : Array<Requette>;
  upFile : File;
  fileFG: FormGroup;
  items = [];

  constructor(
    private formBuilder : FormBuilder,
    private tacheService : TacheService,
    private requetteService : RequetteService,
    private toastr : ToastrService,
    private fileFB: FormBuilder,
    private fileService: FilesService
  ) { }

  ngOnInit(): void {
    this.requetteService.getRequttes().subscribe({
      next: value => {
        this.requettes = value;
      },
      error: err =>{
        throwError(err);
      }
    });
    this.formGroup = this.formBuilder.group({
      requetteId : this.formBuilder.control(""),
      intitule : this.formBuilder.control(""),
      observation : this.formBuilder.control("")
    });
    this.fileFG = this.fileFB.group({
      file: this.fileFB.control("")
    });
  }

  creerTache(){
    let tache: Tache = this.formGroup.value;
    this.tacheService.creerTache(tache).subscribe({
      next : value => {
        let id: string = String(value.id);
        this.uploadFile(id);
        this.toastr.success("Création Tâche", "Succès");
        this.modal.close();
      },
      error : err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    })
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.upFile = file
  }

  uploadFile(id : string){
    let formData = new FormData();
    formData.append('file', this.upFile);
    formData.append('element', "T");
    formData.append('id', id);
    this.fileService.uploadFiles(formData).subscribe({
      next: value => {
        console.log(value);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }
}
