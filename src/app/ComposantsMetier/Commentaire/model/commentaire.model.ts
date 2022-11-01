export interface Commentaire {
  id : number;
  libelle : string;
  statusCommenttaire : string;
  tacheId: number;

  /*public badgeStatus(): string{
    switch (this.statusCommenttaire) {
      case "NON_TRAITE":{
        return "badge badge-warning p-2";
      }
      case "TRAITE":{
        return "badge badge-success p-2";
      }
    }
  }*/
}
