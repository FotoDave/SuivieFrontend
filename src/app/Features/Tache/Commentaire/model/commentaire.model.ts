import {Fichier} from "../../../../Files/model/file.model";

export interface Commentaire {
  id : number;
  libelle : string;
  statusCommenttaire : string;
  fileName : string;
  fileCode : string;
  tacheId: number;

}
