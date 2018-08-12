import { RegistroFuncionarioPage } from './../registro-funcionario/registro-funcionario';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Rol, Perfil, Usuario } from '../../models/global';

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  segmento: string;

  roles: Rol[];
  perfiles: Perfil[];
  funcionarios: Usuario[];

  rol: Rol;
  perfil: Perfil;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {

    this.segmento = 'funcionarios';

    this.getRoles();
    this.getPerfiles();
    this.getFuncionarios();
  }

  getFuncionarios() {
    this.http.get('usuario/funcionario').then((data: any) => this.funcionarios = data.data);
  }

  getRoles() {
    this.http.get('rol').then((data: any) => this.roles = data.data);
  }

  getPerfiles() {
    this.http.get('perfil').then((data: any) => this.perfiles = data.data);
  }

  guardarRol(item: any) {

    if (!item)
      this.rol = new Rol();
    else
      this.rol = item;

    const prompt = this.alertCtrl.create({
      title: 'Rol',
      message: "Digite el nombre del rol",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: this.rol.nombre
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.rol.nombre = data.nombre;
            if (this.rol.id) {
              this.actRol(this.rol);
            }
            else {
              this.nuevoRol(this.rol);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  actRol(data) {
    this.http.put('rol/' + data.id, data).then();
  }

  nuevoRol(data) {
    this.http.post('rol', data).then((data: any) => this.roles.push(data.data));
  }

  guardarFuncionario(item) {
    let modal = this.modalCtrl.create(RegistroFuncionarioPage, { data: item });
    modal.present();

  }
}
