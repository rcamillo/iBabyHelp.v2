import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";

@IonicPage()
@Component({
  selector: "page-dicas",
  templateUrl: "dicas.html"
})
export class DicasPage {
  public listaNoticia: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase
  ) {
    this.listaNoticia = db.list("/noticias/").valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DicasPage");
  }
}
