import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jeux } from '../model/jeux.model';
import { JeuxService } from '../service/jeux.service';
import { Categorie } from '../model/categorie.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-jeux',
  templateUrl: './update-jeux.component.html',

})
export class UpdateJeuxComponent implements OnInit {

  currentJeux = new Jeux();

  categories!: Categorie[];
  updatedCatId?: number;

  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;



  constructor(private activatedRoute: ActivatedRoute,
    private jeuxService: JeuxService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.jeuxService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
    });
    this.jeuxService.consulterJeux(this.activatedRoute.snapshot.params['id'])
    .subscribe( prod =>{ this.currentJeux = prod;
    this.updatedCatId = prod.categorie.id;
    } ) ;
    }
    
    onAddImageJeux() {
      this.jeuxService.uploadImageProd(this.uploadedImage,this.uploadedImage.name,this.currentJeux.id).subscribe( (img : Image) => {
      this.currentJeux.images.push(img);
      });
      }
      
    
        
      
    


  

   /* updateJeux() {
      this.currentJeux.categorie = this.categories.find(cat => cat.id ==
      this.updatedCatId)!;
      //tester si l'image du produit a été modifiée
      if (this.isImageUpdated)
      {
      this.jeuxService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.currentJeux.image = img;
      this.jeuxService
      .updateJeux(this.currentJeux)
      .subscribe((prod) => {
      this.router.navigate(['jeux']);
      });
      });
      }
      else{
      this.jeuxService
      .updateJeux(this.currentJeux)
      .subscribe((prod) => {
      this.router.navigate(['jeux']);
      });
      }
      }*/
      updateJeux() {
        this.currentJeux.categorie = this.categories.find(cat => cat.id ==
        this.updatedCatId)!;
        this.jeuxService
        .updateJeux(this.currentJeux)
        .subscribe((prod) => {
        this.router.navigate(['jeux']);
        });
        }


  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }

    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.jeuxService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images
      const index = this.currentJeux.images.indexOf(img, 0);
      if (index > -1) {
      this.currentJeux.images.splice(index, 1);
      }
      });
      }
    


}
