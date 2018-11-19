import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioProvider } from "../../providers/usuario/usuario";

@Component({
  selector: "page-cadastro",
  templateUrl: "cadastro.html"
})
export class CadastroPage {
  public fotoPerfil: any;
  form: FormGroup;
  usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private provider: UsuarioProvider,
    private toast: ToastController,
    public camera: Camera
  ) {
    this.usuario = this.navParams.data.usuario || {};
    this.createForm(this.fotoPerfil);
  }

  abreCamera() {
    //options do role
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
        this.fotoPerfil = base64Image;
        this.createForm(this.fotoPerfil);
      },
      err => {
        // Handle error
      }
    );
  }

  createForm(imagem) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.form = this.formBuilder.group({
      key: [this.usuario.key],
      nome: [
        this.usuario.nome,
        Validators.compose([
          Validators.maxLength(15),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      email: [
        this.usuario.email,
        Validators.compose([
          Validators.pattern(EMAILPATTERN),
          Validators.required
        ])
      ],
      senha: [
        this.usuario.senha,
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.required
        ])
      ],
      babyname: [this.usuario.babyname, Validators.required],
      sexo: [this.usuario.sexo, Validators.required],
      babyDate: [this.usuario.babyDate, Validators.required],
      fotoPerfil: imagem
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider
        .save(this.form.value)
        .then(() => {
          this.toast
            .create({ message: "Usuario salvo com sucesso.", duration: 3000 })
            .present();
          this.navCtrl.pop();
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
    console.log("ionViewDidLoad CadastroPage");
  }
}
