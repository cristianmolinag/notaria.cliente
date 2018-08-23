import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Usuario } from '../../models/global';



@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})


export class RegistroClientePage {

  usuario: Usuario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController) {

    if (this.navParams.get('data')) {
      this.usuario = this.navParams.get('data');
    } else {
      this.usuario = new Usuario();
    }
  }

  registro() {
    if (!this.usuario.nombres ||
      !this.usuario.apellidos ||
      !this.usuario.correo) {

      const toast = this.toastCtrl.create({
        message: 'Hay campos vacíos',
        duration: 3000
      });
      toast.present();
    }
    else {
      if (this.usuario.id) {
        this.http.put('usuario/update/cliente/' + this.usuario.id, this.usuario).then((data: any) => {
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
        if (this.usuario.contrasena) {
          this.http.post('usuario/registro/cliente', this.usuario).then((data: any) => {
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
        else {
          const toast = this.toastCtrl.create({
            message: 'Ingrese una contraseña válida',
            duration: 3000
          });
          toast.present();
        }

      }
    }
  }
}
