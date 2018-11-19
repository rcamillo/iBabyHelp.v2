import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "page-dicas",
  templateUrl: "dicas.html"
})
export class DicasPage {
  public listaNoticia: Observable<any[]>;
  public quemCurtiu: Observable<any[]>;
  public idusuario: string;
  public listUsuario: any[];
  public voceCurtiu: number = 0;

  constructor(
    public navCtrl: NavController,
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
      this.voceCurtiu = 0;
      let keyArr: any[] = null;
      keyArr = Object.keys(noticia.quemCurtiu);
      keyArr.forEach((key: any) => {
        if (key == this.idusuario) {
          this.db
            .list("/noticias/")
            .update(noticia.id, { curtidas: noticia.curtidas - 1 });
          this.db.list("/noticias/" + noticia.id + "/quemCurtiu/").remove(this.idusuario);
          this.voceCurtiu = 1;
        }
      });
      if (this.voceCurtiu == 0) {
        this.db
          .list("/noticias/")
          .update(noticia.id, { curtidas: noticia.curtidas + 1 });
        this.db.database.ref("/noticias/" + noticia.id + "/quemCurtiu/").child(this.idusuario).set('')
      }
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DicasPage");
  }
}
