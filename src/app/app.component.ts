import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild('myNav') nav: ViewChild;
  rootPage: any = LoginPage;

  constructor(
    public afAuth: AngularFireAuth,
    public splashscreen: SplashScreen,
    platform: Platform) {
    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged(user => {
        if (user != null) {
          // está logado:
          this.rootPage = TabsPage
          splashscreen.hide();
        } else {
          // não está logado:
          this.rootPage = LoginPage
          splashscreen.hide();
        }
      });
    });
  }
}