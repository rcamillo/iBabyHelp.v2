import { Component } from "@angular/core";
import { NavController, NavParams, List } from "ionic-angular";

import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

import { AngularFireAuth } from "@angular/fire/auth";
import { NgIf } from "@angular/common";
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

@Component({
  selector: "page-dicas",
  templateUrl: "dicas.html"
})
export class DicasPage {
  public listaNoticia: Observable<any[]>;
  public idusuario: string;
  public teste;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.idusuario = this.afAuth.auth.currentUser.uid;
    this.listaNoticia = db.list("/noticias/").valueChanges();
  }

  curtida(noticia: any) {
    if (noticia.curtidas == 0) {
      this.db
        .list("/noticias/")
        .update(noticia.id, { curtidas: noticia.curtidas + 1 });
      this.db.database.ref("/noticias/" + noticia.id + "/quemCurtiu/").child(this.idusuario).set('')
    } else {
      this.teste = Object.keys(noticia.quemCurtiu)
      if (this.idusuario == this.teste) {
        this.db
          .list("/noticias/")
          .update(noticia.id, { curtidas: noticia.curtidas - 1 });
        this.db.list("/noticias/" + noticia.id + "/quemCurtiu/").remove(this.idusuario);
      } else {
        this.db
          .list("/noticias/")
          .update(noticia.id, { curtidas: noticia.curtidas + 1 });
        this.db.database.ref("/noticias/" + noticia.id + "/quemCurtiu/").child(this.idusuario).set('')
      };
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DicasPage");
  }
}
