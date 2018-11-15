import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from "@ionic-native/camera";

import { AngularFireAuthModule } from "@angular/fire/auth";

import { AngularFireModule } from "@angular/fire";

import { AngularFireDatabaseModule } from "angularfire2/database";

import { MyApp } from "./app.component";
import { AgendaPage } from "../pages/agenda/agenda";
import { AmamentacaoPage } from "../pages/amamentacao/amamentacao";
import { PerfilPage } from "../pages/perfil/perfil";

import { CadastroPage } from "../pages/cadastro/cadastro";
import { CadastroMedicoPage } from "../pages/cadastro-medico/cadastro-medico";
import { CadastroVacinaPage } from "../pages/cadastro-vacina/cadastro-vacina";
import { CadastroAmamentacaoPage } from "../pages/cadastro-amamentacao/cadastro-amamentacao";

import { DicasPage } from "../pages/dicas/dicas";
import { LoginPage } from "../pages/login/login";
import { RecuperaSenhaPage } from "../pages/recupera-senha/recupera-senha";

import { TabsPage } from "../pages/tabs/tabs";

import { MedicoProvider } from "../providers/medico/medico";
import { VacinaProvider } from "../providers/vacina/vacina";
import { AmamentacaoProvider } from "../providers/amamentacao/amamentacao";
import { UsuarioProvider } from "../providers/usuario/usuario";

const config = {
  apiKey: "AIzaSyA_gfv_QCjE7fikvzTKz3HGzT-HQBhNixk",
  authDomain: "projeto-fatec2018.firebaseapp.com",
  databaseURL: "https://projeto-fatec2018.firebaseio.com",
  projectId: "projeto-fatec2018",
  storageBucket: "projeto-fatec2018.appspot.com",
  messagingSenderId: "727170447768"
};

@NgModule({
  declarations: [
    MyApp,
    AgendaPage,
    AmamentacaoPage,
    CadastroPage,
    CadastroMedicoPage,
    CadastroVacinaPage,
    CadastroAmamentacaoPage,
    RecuperaSenhaPage,
    DicasPage,
    LoginPage,
    TabsPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    AgendaPage,
    AmamentacaoPage,
    CadastroPage,
    CadastroMedicoPage,
    CadastroVacinaPage,
    CadastroAmamentacaoPage,
    RecuperaSenhaPage,
    DicasPage,
    LoginPage,
    TabsPage,
    PerfilPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MedicoProvider,
    VacinaProvider,
    AmamentacaoProvider,
    UsuarioProvider,
    Camera,
    SplashScreen
  ]
})
export class AppModule { }
