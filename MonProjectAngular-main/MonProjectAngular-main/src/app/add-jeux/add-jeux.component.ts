import { Component, OnInit } from '@angular/core';
import { Jeux } from '../model/jeux.model';
import { JeuxService } from '../service/jeux.service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-add-jeux',
  templateUrl: './add-jeux.component.html',

})
export class AddJeuxComponent implements OnInit {
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;

  uploadedImage!: File;
  imagePath: any;


  newJeux = new Jeux();
  constructor(private jeuxService: JeuxService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.jeuxService.listeCategories().
      subscribe(cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      });
  }
  addJeux() {
    // Set the category for the new game
    this.newJeux.categorie = this.categories.find(cat => cat.id == this.newIdCat)!;
  
    // Add the new game
    this.jeuxService.ajouterJeux(this.newJeux)
      .subscribe((newJeu) => {
        // Upload the image after the game is added
        this.jeuxService.uploadImageProd(this.uploadedImage, this.uploadedImage.name, newJeu.id)
          .subscribe((img: Image) => {
            // Assign the image to the game after successful upload
            this.newJeux.image = img;
          });
        // Navigate to the list of games
        this.router.navigate(['jeux']);
      });
  }
  

  
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
    

}
