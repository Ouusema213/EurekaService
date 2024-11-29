import { Injectable } from '@angular/core';
import { Jeux } from '../model/jeux.model';
import { Categorie } from '../model/categorie.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../model/categorieWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/Image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class JeuxService {
  apiURL: string = 'http://localhost:8070/jeux/api';
  apiURLCat: string = 'http://localhost:8070/jeux/cat';


  //jeu: Jeux[];
  // categories: Categorie[];

  constructor(private http: HttpClient, private authService: AuthService) {
    //  this.categories = [{ idCat: 1, nomCat: "War" },
    //  { idCat: 2, nomCat: "Action" },
    //  ];
    /*this.jeu = [
      { id: 1, nom: "Valorant", prix: 3000.600, date: new Date("01/14/2011"), categorie: { id: 1, nomC: "War" } },
      { id: 2, nom: " League Of Legends", prix: 450, date: new Date("12/17/2010"), categorie: { id: 2, nomC: "Action" } },
      { id: 3, nom: "DOTA", prix: 900.123, date: new Date("02/20/2020"), categorie: { id: 3, nomC: "Adventure" } }
    ];*/
  }

  listeJeux(): Observable<Jeux[]> {
    return this.http.get<Jeux[]>(this.apiURL+"/all");
  }



  ajouterJeux(j: Jeux): Observable<Jeux> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Jeux>(this.apiURL + "/add-jeux", j, { headers: httpHeaders });
  }

  supprimerJeux(id: number) {
    const url = `${this.apiURL}/deljeux/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });

  }

  consulterJeux(id: number): Observable<Jeux> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Jeux>(url, { headers: httpHeaders });
  }


  updateJeux(j: Jeux): Observable<Jeux> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Jeux>(this.apiURL + "/updatejeux", j, { headers: httpHeaders });

  }

 /* trierJeux() {
    this.jeu = this.jeu.sort((n1, n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      }
      if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }*/

  listeCategories(): Observable<CategorieWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<CategorieWrapper>(this.apiURLCat, { headers: httpHeaders }
    );

  }


  rechercherParCategorie(id: number): Observable<Jeux[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    const url = `${this.apiURL}/jeuxCat/${id}`;
    return this.http.get<Jeux[]>(url, { headers: httpHeaders });
}


  rechercherParNom(nom: string): Observable<Jeux[]> {
    const url = `${this.apiURL}/jeuxByName/${nom}`;
    return this.http.get<Jeux[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": jwt
    });
    return this.http.post<Categorie>(this.apiURLCat, cat, { headers: httpHeaders });
}

uploadImage(file: File, filename: string): Observable<Image>{
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${this.apiURL + '/image/upload'}`;
  return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
  const url = `${this.apiURL + '/image/get/info'}/${id}`;
  return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, id:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageJeu'}/${id}`;
    return this.http.post(url, imageFormData);
    }

    supprimerImage(id : number) {
      const url = `${this.apiURL}/image/delete/${id}`;
      return this.http.delete(url, httpOptions);
      }





}
