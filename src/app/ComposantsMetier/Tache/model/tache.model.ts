export interface Tache{
  id : number;
  intitule : string;
  date_debut : Date;
  date_fin : Date;
  observation : string;
  debut_previsionel : Date;
  fin_previsionel : Date;
  statusTache : string;
  requetteId : number;
  collaborateurId : number;

  /*public badgeStatus(): string{
    switch (this.statusTache) {
      case "NON_PLANIFIE":{
        return "badge badge-danger p-2";
      }
      case "PLANIFIE":{
        return "badge badge-warning p-2";
      }
      case "EN_COURS":{
        return "badge badge-primary p-2";
      }
      case "A_VALIDER_ALPHA":{
        return "badge badge-info p-2";
      }
      case "A_VALIDER_BETA":{
        return "badge badge-dark p-2";
      }
      case "TERMINE":{
        return "badge badge-success p-2";
      }
    }
  }*/
}

