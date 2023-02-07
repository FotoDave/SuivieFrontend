import {Component, OnInit} from '@angular/core';
import {RequetteService} from "../service/requette.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {Requette} from "../model/requette.model";
import {ToastrService} from "ngx-toastr";
import {FilesService} from "../../../Files/service/files.service";
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Fichier} from 'src/app/Files/model/file.model';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-create-requette',
  templateUrl: './create-requette.component.html',
  styleUrls: ['./create-requette.component.scss']
})
export class CreateRequetteComponent implements OnInit {
  requtte: Observable<Array<Requette>>
  createFormGroup: FormGroup;
  upFile : File;
  fileFG: FormGroup;
  statusList = [
    {label: "NOUVELLE_FONCTIONNALITE", value: "NOUVELLE_FONCTIONNALITE"},
    {label: "CORRECTION_BUGS", value: "CORRECTION_BUGS"},
  ];
  private fileStatus = { status:'', requestType:'', percent:0}

  constructor(
    private requetteService: RequetteService,
    private router: Router,
    private createFB: FormBuilder,
    private fileFB: FormBuilder,
    private toastr: ToastrService,
    private fileService: FilesService
  ) {
  }

  ngOnInit(): void {
    this.createFormGroup = this.createFB.group({
      intitule: this.createFB.control(""),
      typeRequette: this.createFB.control(""),
      module: this.createFB.control(""),
      fonctionnalite: this.createFB.control(""),
      urgence: this.createFB.control(""),
      observation: this.createFB.control("")
    });

    this.fileFG = this.fileFB.group({
      file: this.fileFB.control("")
    });
  }

  createRequtte() {
    let requette: Requette = this.createFormGroup.value;
    requette.date_creation = new Date();
    this.requetteService.createRequette(requette).subscribe({
      next: value => {
        this.toastr.success("Création Requette", "Succès");
        this.router.navigateByUrl("/requettes");
      },
      error: err => {
        this.toastr.error("Problème d'accès au serveur", "Erreur");
        throwError(err)
      }
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.upFile = file
    console.log("File : "+this.upFile);
    let formData = new FormData();
    //let blob = new Blob([this.upFile], { type: 'application/octet-stream' });
    formData.append('file', this.upFile);
    this.fileService.uploadFiles(formData).subscribe({
      next: value => {
        console.log(value);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  uploadFile(){
    //let file:File = this.fileFG.get('file').value;
    //console.log(this.upFile);
    /*let blob:Blob;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.upFile);
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      blob = new Blob([arrayBuffer], {type: this.upFile.type});
    }*/


  }

  /*
const formData = new FormData();
formData.append('file', this.form.get('file').value);       this.http.post('yourEndpoint', formData, {
  headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
}).subscribe(response => {
  // handle the response
}); */

  /*downloadFile(fileCode: string) {
    this.fileService.downloadFile(fileCode).subscribe({
      next: event => {
        console.log(event);
        this.resportProgress(event);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  private resportProgress(httpEvent: HttpEvent<Fichier | Blob>){
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total, 'Downloading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if(httpEvent.body instanceof Blob){
          saveAs(new File([httpEvent.body], httpEvent.headers.get('filename'), {
            type :  httpEvent.headers.get('Content-Type')
          }))
        }
        break;

      default:
        console.log(httpEvent);
      break;
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total)
  }*/
}
