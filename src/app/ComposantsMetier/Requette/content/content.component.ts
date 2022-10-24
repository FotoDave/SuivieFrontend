import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  formGroup : FormGroup;
  /*even : EventEmitter<undefined>;*/
  @Input()
  modal: undefined;
  intitule : string;
  constructor(
    private modalService : NgbModal,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      requette : this.formBuilder.control(""),
      intitule : this.formBuilder.control(""),
      observation : this.formBuilder.control(""),
    })
  }

    creerTache() {

    }
  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }
}
