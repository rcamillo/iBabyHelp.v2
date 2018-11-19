import { Component } from "@angular/core";

import { DicasPage } from "../dicas/dicas";
import { AmamentacaoPage } from "../amamentacao/amamentacao";
import { AgendaPage } from "../agenda/agenda";
import { PerfilPage } from "../perfil/perfil";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = DicasPage;
  tab2Root = AgendaPage;
  tab3Root = AmamentacaoPage;
  tab4Root = PerfilPage;

  constructor() { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");
  }

}
