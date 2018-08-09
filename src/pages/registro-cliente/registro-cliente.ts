import { HttpProvider } from './../../providers/http/http';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';



@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})


export class RegistroClientePage {

  persona: Persona;
  usuario: Usuario;
  tiposDocumento: TipoDocumento[];
  nacionalidades: Nacionalidad[];



  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpProvider, private toastCtrl: ToastController) {

    this.persona = new Persona;
    this.usuario = new Usuario;

    this.getTiposDocumento();
    this.getNacionalidades();
  }

  getTiposDocumento() {
    this.http.get('tipo_documento').then((data: any) => {
      console.log(data);
      this.tiposDocumento = data;
    });


  }

  getNacionalidades() {
    this.http.get('nacionalidad').then((data: any) => {
      console.log(data);
      this.nacionalidades = data;
    });
  }

  registro() {
    if (!this.persona.documento ||
      !this.persona.nacionalidad_id ||
      !this.persona.primer_apellido ||
      !this.persona.primer_nombre ||
      !this.persona.segundo_apellido ||
      !this.persona.segundo_nombre ||
      !this.persona.tipo_documento_id ||
      !this.usuario.contrasena ||
      !this.usuario.correo) {

      const toast = this.toastCtrl.create({
        message: 'Hay campos vacíos',
        duration: 3000
      });
      toast.present();
    }
    else {
      const data: any = { persona: this.persona, usuario: this.usuario };

      JSON.stringify(data);
      this.http.post('cliente', data).then((data: any) => {
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

export class Persona {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  documento: number;
  tipo_documento_id: number;
  nacionalidad_id: number;
}

export class Usuario {
  correo: string;
  contrasena: string;
  estado: number;
}

export class TipoDocumento {
  id: number;
  nombre: string;
}

export class Nacionalidad {
  id: number;
  nombre: string;
}

