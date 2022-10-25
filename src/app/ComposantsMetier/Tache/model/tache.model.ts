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
}
