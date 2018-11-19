import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { CadastroAmamentacaoPage } from "../cadastro-amamentacao/cadastro-amamentacao";
import { AmamentacaoProvider } from "../../providers/amamentacao/amamentacao";

@Component({
  selector: "page-amamentacao",
  templateUrl: "amamentacao.html"
})
export class AmamentacaoPage {
  public listAmamentacao: Observable<any[]>;
  public uiduser: string;
  public amamentacao: string;

  constructor(
    private navCtrl: NavController,
    private toast: ToastController,
    private provider: AmamentacaoProvider,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public navParams: NavParams
  ) {
    this.listAmamentacao = db.list("/agenda/amamentacao").valueChanges();
    this.uiduser = afAuth.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AmamentacaoPage");
  }

  newAmamentacao() {
    this.navCtrl.push(CadastroAmamentacaoPage);
  }

  editAmamentacao(a: any) {
    this.navCtrl.push(CadastroAmamentacaoPage, { amamentacao: a });
  }

  removeAmamentacao(key: string) {
    if (key) {
      this.provider
        .remove(key)
        .then(() => {
          this.toast
            .create({
              message: "Amamentação removida com sucesso.",
              duration: 3000
            })
            .present();
        })
        .catch(() => {
          this.toast
            .create({
              message: "Falha ao remover Amamentação.",
              duration: 3000
            })
            .present();
        });
    }
  }
}
