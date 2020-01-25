import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AutorInt } from 'src/app/services/database.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.page.html',
  styleUrls: ['./autores.page.scss'],
})
export class AutoresPage implements OnInit {

  autores: AutorInt[] = [];
  libros: Observable<any[]>;
  
  autor={};
  libro={};
  selectedView='autors';
  constructor(private db: DatabaseService,public alertController: AlertController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy=>{
      if(rdy){
        this.db.getAutores().subscribe(autors=>{
          console.log('Starting the DB', autors)
          this.autores=autors;
        })
        this.libros=this.db.getLibros();
      }
    });
  }
  addAutorP(){
    this.db.addAutor(this.autor['nombre'], this.autor['genero'], this.autor['img'])
    .then(_=>{
      this.autor={};
    });
  }
  addLibroP(){
    this.db.addLibro(this.libro['titulo'],this.libro['autorId'])
    .then(_=>{
      this.libro={};
      console.log("Book added");
    })
  }
  deleteAutorP(id){
    this.db.deleteAutor(id)
    .then(_=>{
      this.autor={};
      console.log("Author Deleted");
    })
  }
  async updateAutorP(id,nombre,genero,img){
    {const alert = await this.alertController.create({
      header: 'Editar',
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          placeholder: nombre
        },
        {
          name: 'Genero',
          type: 'text',
          placeholder: genero
        },
        {
          name: 'img',
          type: 'text',
          placeholder: img
        },
        {
          name: 'id',
          value: id,
          disabled: true
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.db.updateAutorB(data.Nombre,data.genero,data.img,data.id)
            console.log('Confirm Ok', data);
          }
        }
      ]
    });
    await alert.present();
    }
  }
}

/*{const alert = await this.alertController.create({
  header: 'Prompt!',
  inputs: [
    {
      name: 'Nombre',
      type: 'text',
      placeholder:
    },
    {
      name: 'Genero',
      type: 'text',
      placeholder:
    },
    {
      name: 'img',
      type: 'text',
      placeholder:
    },
  ],
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel');
      }
    }, {
      text: 'Ok',
      handler: (data) => {
        console.log('Confirm Ok', data);
      }
    }
  ]
});

await alert.present();
}*/