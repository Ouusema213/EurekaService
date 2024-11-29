import { Categorie } from "./categorie.model";
import { Image } from "./Image.model";

export class Jeux {
    
    
    
    id! : number;
    nom! : string;
    prix! : number;
    date! : Date ;
    categorie! : Categorie;
    image! : Image ; 
    imageStr!:string;

    images!: Image[];
  

    }