import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from "@angular/fire/auth";

import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = null;
  @ViewChild(Nav) private nav: Nav;
  public uiduser: string;
  public usuario: any;

  constructor(
    platform: Platform,
    public afAuth: AngularFireAuth,
    private splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged((user) => {
        if (user != null) {
          // está logado:
          this.nav.push(TabsPage);
          this.splashScreen.hide();
          this.uiduser = this.afAuth.auth.currentUser.uid;
        } else {
          // não está logado:
          this.nav.push(LoginPage);
          this.splashScreen.hide();
        }
      })
    });
  }
}
