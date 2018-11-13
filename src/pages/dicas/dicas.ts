import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "page-dicas",
  templateUrl: "dicas.html"
})
export class DicasPage {
  public listaNoticia: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    //this.id = navParams.get("id");
    //this.pessoa = db.list<any>("usuarios", ref => ref.ref.("id", "==", this.id)).valueChanges();
    this.listaNoticia = db.list("/noticias/").valueChanges();
  }

  curtida(noticia: any) {
    // if (noticia.usuarios.uid) {
    //   this.db
    //     .list("/noticias/")
    //     .update(noticia.id, { curtidas: noticia.curtidas - 1 });
    // } else {
    //   this.db
    //     .list("/noticia/quemCurtiu/")
    //     .update(noticia.usuarios.curtiu, {
    //       curtiram: this.afAuth.auth.currentUser.uid
    //     });
    this.db
      .list("/noticias/")
      .update(noticia.id, { curtidas: noticia.curtidas + 1 });
    // }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad DicasPage");
  }
}
