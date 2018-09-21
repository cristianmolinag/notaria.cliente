import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-registro-cita',
  templateUrl: 'registro-cita.html',
})
export class RegistroCitaPage {

  frmCita: FormGroup;
  usuario: any;
  minDate: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private frmBuilder: FormBuilder,
    private user: UserProvider
  ) {

    this.minDate = new Date().toISOString();
    this.usuario = this.user.getUsuario();

    this.frmCita = this.frmBuilder.group({
      id: [{ value: null, disabled: false }],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      cliente_id: [{ value: null, disabled: false }],
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  crear() {

    this.frmCita.patchValue({
      cliente_id: this.usuario.id,
    });

    console.log(this.frmCita.value);
    this.http.post('cita', this.frmCita.value).then((data: any) => {
      if (data.data) {
        const toast = this.toastCtrl.create({
          message: "Cita creada con éxito",
          duration: 3000
        });
        toast.present();
        this.dismiss();
      }
    })

  }

}
