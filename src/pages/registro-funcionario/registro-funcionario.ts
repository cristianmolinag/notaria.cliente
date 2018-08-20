import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Usuario, Firma } from '../../models/global';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-registro-funcionario',
  templateUrl: 'registro-funcionario.html',
})
export class RegistroFuncionarioPage {

  usuario: Usuario;
  firma: Firma;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController) {

    if (this.navParams.get('data')) {
      this.usuario = this.navParams.get('data');
      this.firma = this.usuario.firma;
    } else {
      this.usuario = new Usuario();
      this.firma = new Firma();
    }
  }

  guardarFirmaFuncionario($event) {

    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.firma.firma = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  registro() {
    this.usuario.firma = this.firma;

    if (!this.usuario.nombres ||
      !this.usuario.apellidos ||
      !this.usuario.correo ||
      !this.usuario.firma.firma) {

      const toast = this.toastCtrl.create({
        message: 'Hay campos vacíos',
        duration: 3000
      });
      toast.present();
    }
    else {
      if (this.usuario.id) {
        this.http.put('usuario/update/funcionario/' + this.usuario.id, this.usuario).then((data: any) => {
          if (data.mensaje) {
            console.log(data);
            const toast = this.toastCtrl.create({
              message: data.mensaje,
              duration: 3000
            });
            toast.present();
          }
          else {
            const toast = this.toastCtrl.create({
              message: "Funcionario actualizado con éxito",
              duration: 3000
            });
            toast.present();
            this.viewCtrl.dismiss();
          }
        });
      } else {
        if (this.usuario.contrasena) {
          this.http.post('usuario/registro/funcionario', this.usuario).then((data: any) => {
            if (data.mensaje) {
              console.log(data);
              const toast = this.toastCtrl.create({
                message: data.mensaje,
                duration: 3000
              });
              toast.present();
            }
            else {
              const toast = this.toastCtrl.create({
                message: "Funcionario creado con éxito",
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
