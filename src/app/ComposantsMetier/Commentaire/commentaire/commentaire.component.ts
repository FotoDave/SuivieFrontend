import {Component, Input, OnInit} from '@angular/core';
import {CommentaireService} from "../service/commentaire.service";
import {Commentaire} from "../model/commentaire.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {throwError} from "rxjs";

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
  commentaire : Commentaire;

  constructor(
    private commentaireService : CommentaireService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      libelle : this.formBuilder.control("")
    });
  }

  creerCommentaire(){
    this.commentaire = this.formGroup.value;
    this.commentaire.tacheId = this.tacheId;
    this.commentaireService.creerCommentaire(this.commentaire).subscribe({
      next:value => {
        this.modal.close();
      },
      error:err => {
        throwError(err);
      }
    })
  }
}
