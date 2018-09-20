import { Storage } from '@ionic/storage';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-registro-perfil',
  templateUrl: 'registro-perfil.html',
})
export class RegistroPerfilPage {

  frmPerfil: FormGroup;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private frmBuilder: FormBuilder,
    private storage: Storage,
    private user: UserProvider) {


    this.frmPerfil = this.frmBuilder.group({
      id: [{ value: null, disabled: false }],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: [{ value: null, disabled: false }],
    });

    var usuario = this.navParams.get('data');
    this.frmPerfil.patchValue({
      id: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
    });

  }



  actualizar() {
    this.http.put('usuario/' + this.frmPerfil.value.id, this.frmPerfil.value).then((data: any) => {
      if (data.mensaje) {
        const toast = this.toastCtrl.create({
          message: data.mensaje,
          duration: 3000
        });
        toast.present();
      }
      else {
        const toast = this.toastCtrl.create({
          message: "Usuario actualizado con éxito",
          duration: 3000
        });
        toast.present();
        this.user.setUsuario(data.data);
        this.storage.set('usuario', data.data);
        this.viewCtrl.dismiss();
      }
    });
  }

}
