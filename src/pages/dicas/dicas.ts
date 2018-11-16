import { Component } from "@angular/core";
import { NavController, NavParams, List } from "ionic-angular";

import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "page-dicas",
  templateUrl: "dicas.html"
})
export class DicasPage {
  public listaNoticia: Observable<any[]>;
  // public listaQuemCurtiu: Observable<any[]>;
  public idusuario: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) 
  {
    this.idusuario = this.afAuth.auth.currentUser.uid;
    this.listaNoticia = db.list("/noticias/").valueChanges();
  }

  curtida(noticia: any) {
    if (this.idusuario == noticia.quemCurtiu) {
      this.db
      .list("/noticias/")
      .update(noticia.id, { curtidas: noticia.curtidas - 1 });
      this.db.list("/noticias/"+ noticia.id +"/quemCurtiu/").remove()
    }else{
      this.db
      .list("/noticias/")
      .update(noticia.id, { curtidas: noticia.curtidas + 1 });
      this.db.database.ref("/noticias/"+ noticia.id).child("/quemCurtiu/").set(this.idusuario)
    };
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DicasPage");
  }
}
