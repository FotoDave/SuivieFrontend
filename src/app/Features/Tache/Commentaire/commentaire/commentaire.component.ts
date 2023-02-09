import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentaireService} from "../service/commentaire.service";
import {Commentaire} from "../model/commentaire.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FilesService} from "../../../../Files/service/files.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  formGroup : FormGroup;
  @Input()
  modal : any;
  @Input()
  tacheId : number;
  @Output()
  actualisation : EventEmitter<any> = new EventEmitter<any>();
  commentaire : Commentaire;
  upFile : File;
  fileFG: FormGroup;

  constructor(
    private commentaireService : CommentaireService,
    private formBuilder : FormBuilder,
    private toastr : ToastrService,
    private fileFB: FormBuilder,
    private fileService: FilesService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      libelle : this.formBuilder.control("")
    });
    this.fileFG = this.fileFB.group({
      file: this.fileFB.control("")
    });
  }

  creerCommentaire(){
    this.commentaire = this.formGroup.value;
    this.commentaire.tacheId = this.tacheId;
    this.commentaireService.creerCommentaire(this.commentaire).subscribe({
      next:value => {
        let id: string = String(value.id);
        this.uploadFile(id);
        this.actualisation.emit();
        this.modal.close();
      },
      error:err => {
        this.toastr.error("Problème d'accès au serveur","Erreur" );
        throwError(err);
      }
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.upFile = file
  }

  uploadFile(id : string){
    let formData = new FormData();
    formData.append('file', this.upFile);
    formData.append('element', "C");
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
