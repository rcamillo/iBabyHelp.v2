import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { AngularFireAuth } from "@angular/fire/auth";

import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // @ViewChild(Nav) public ir: Nav;
  rootPage: any = null;

  constructor(
    platform: Platform,
    public afAuth: AngularFireAuth,
  ) {
    let self = this;
    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged((user) => {
        if (user != null) {
          // está logado:
          this.rootPage = TabsPage;
        } else {
          // não está logado:
          this.rootPage = LoginPage;
        }
      })
    });
  }
}
