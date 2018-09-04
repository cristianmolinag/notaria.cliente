import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})


export class RegistroClientePage {

  frmCliente: FormGroup;
  nombreBoton: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private frmBuilder: FormBuilder) {

    this.frmCliente = this.frmBuilder.group({
      id: [{ value: null, disabled: false }],
      nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      apellidos: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}')])],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })

    var usuario: any = this.navParams.get('data');

    if (usuario) {
      this.nombreBoton = "Actualizar Cliente";
      this.frmCliente.setValue({
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        contrasena: usuario.contrasena
      })
    }
    else {
      this.nombreBoton = "Registrar Cliente";
    }
  }

  registro() {

    if (this.frmCliente.value.id) {
      this.http.put('usuario/update/cliente/' + this.frmCliente.value.id, this.frmCliente.value).then((data: any) => {
        if (data.mensaje) {
          const toast = this.toastCtrl.create({
            message: data.mensaje,
            duration: 3000
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            message: "Cliente actualizado con éxito",
            duration: 3000
          });
          toast.present();
          this.viewCtrl.dismiss();
        }
      });
    } else {

      this.http.post('usuario/registro/cliente', this.frmCliente.value).then((data: any) => {
        if (data.mensaje) {
          const toast = this.toastCtrl.create({
            message: data.mensaje,
            duration: 3000
          });
          toast.present();
        }
        else {
          const toast = this.toastCtrl.create({
            message: "Usuario creado con éxito",
            duration: 3000
          });
          toast.present();
          this.navCtrl.pop();
        }
      });
    }
  }
}
