import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { DicasPage } from "../dicas/dicas";
import { AmamentacaoPage } from "../amamentacao/amamentacao";
import { AgendaPage } from "../agenda/agenda";
import { PerfilPage } from "../perfil/perfil";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1 = DicasPage;
  tab2 = AgendaPage;
  tab3 = AmamentacaoPage;
  tab4 = PerfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");
  }
}
