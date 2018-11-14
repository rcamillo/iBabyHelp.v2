import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { Observable } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";

import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = null;

  public listagemUsuario: Observable<any[]>;
  public uiduser: string;
  public usuario: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public afAuth: AngularFireAuth
  ) {
    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged(user => {
        if (user != null) {
          // está logado:
          this.rootPage = TabsPage;
          statusBar.styleDefault();
          splashScreen.hide(); // <-- aqui
          this.uiduser = this.afAuth.auth.currentUser.uid;
          this.usuario = this.listagemUsuario;
        } else {
          statusBar.styleDefault();
          splashScreen.hide(); // <-- aqui
          // não está logado:
          this.rootPage = LoginPage;
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }
}
