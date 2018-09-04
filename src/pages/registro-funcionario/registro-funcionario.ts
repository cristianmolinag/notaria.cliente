import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Firma, Rol } from '../../models/global';
import { HttpProvider } from '../../providers/http/http';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'page-registro-funcionario',
  templateUrl: 'registro-funcionario.html',
})
export class RegistroFuncionarioPage {

  frmFuncionario: FormGroup;
  nombreBoton: string;

  // usuario: Usuario;
  firma: Firma;
  roles: Rol[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private frmBuilder: FormBuilder) {

    this.frmFuncionario = this.frmBuilder.group({
      id: [{ value: null, disabled: false }],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      rol_id: ['', Validators.required]
    });

    this.firma = new Firma();

    var usuario = this.navParams.get('data');

    if (usuario) {
      this.nombreBoton = "Actualizar funcionario"
      this.frmFuncionario.setValue({
        id: usuario.id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        rol_id: usuario.usuario_rol[0].rol_id
      });
    } else {
      this.nombreBoton = "Nuevo funcionario"
    }

    this.http.get('rol').then((data: any) => this.roles = data.data);
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
    var funcionario: any = this.frmFuncionario.value;

    if (funcionario.id) {
      if (this.firma.firma) {
        funcionario.firma = this.firma;
      }
      this.http.put('usuario/update/funcionario/' + funcionario.id, funcionario).then((data: any) => {
        if (data.mensaje) {
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

      if (!this.firma.firma) {
        const toast = this.toastCtrl.create({
          message: "Debe insertar una firma",
          duration: 3000
        });
        toast.present();
      } else {
        funcionario.firma = this.firma;
        this.http.post('usuario/registro/funcionario', funcionario).then((data: any) => {
          if (data.mensaje) {
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
    }



    // }
  }
}
