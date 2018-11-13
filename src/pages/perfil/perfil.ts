import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Observable } from "rxjs";

import { Camera, CameraOptions } from "@ionic-native/camera";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "angularfire2/database";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsuarioProvider } from "../../providers/usuario/usuario";

@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html"
})
export class PerfilPage {
  public fotoPerfilNew: any;
  form: FormGroup;
  usuario: any;

  public listagemUsuario: Observable<any[]>;
  public uiduser: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private provider: UsuarioProvider,
    private toast: ToastController,
    public camera: Camera
  ) {
    this.usuario = this.navParams.data.usuario || {};
    this.listagemUsuario = db.list("/usuario/").valueChanges();
    this.uiduser = this.afAuth.auth.currentUser.uid;
    this.fotoPerfilNew = null;
    this.createForm(this.fotoPerfilNew);
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public editUsuario(u: any): void {
    this.navCtrl.push(PerfilPage, { usuario: u });
  }

  abreCamera() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      targetHeight: 600,
      allowEdit: true,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.fotoPerfilNew = base64Image;
        this.createForm(this.fotoPerfilNew);
      },
      err => {}
    );
  }

  createForm(image) {
    if (this.fotoPerfilNew == null) {
      this.form = this.formBuilder.group({
        key: [this.usuario.key],
        nome: [this.usuario.nome, Validators.required],
        babyname: [this.usuario.babyname, Validators.required],
        sexo: [this.usuario.sexo, Validators.required],
        babyDate: [this.usuario.babyDate, Validators.required],
        foto: [this.usuario.fotoPerfil]
      });
    } else {
      image = null;
      image = this.fotoPerfilNew;
      this.form = this.formBuilder.group({
        key: [this.usuario.key],
        nome: [this.usuario.nome, Validators.required],
        babyname: [this.usuario.babyname, Validators.required],
        sexo: [this.usuario.sexo, Validators.required],
        babyDate: [this.usuario.babyDate, Validators.required],
        foto: image
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider
        .save(this.form.value)
        .then(() => {
          this.toast
            .create({ message: "Usuario salvo com sucesso.", duration: 3000 })
            .present();
          this.navCtrl.popToRoot();
        })
        .catch(e => {
          this.toast
            .create({ message: "Erro ao salvar usuário.", duration: 3000 })
            .present();
          console.error(e);
        });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PerfilPage");
  }
}
