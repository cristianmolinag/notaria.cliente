import { RegistroFuncionarioPage } from './../registro-funcionario/registro-funcionario';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Rol, Perfil, Usuario, Permiso, rolesPorPermiso } from '../../models/global';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  segmento: string;
  frmPermiso: FormGroup;
  roles: Rol[];
  permisos: Permiso[];
  perfiles: Perfil[];
  funcionarios: Usuario[];
  clientes: Usuario[];
  rolesPorPermiso: rolesPorPermiso;

  rol: Rol;
  perfil: Perfil;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private frmBuilder: FormBuilder) {

    this.frmPermiso = this.frmBuilder.group({
      rol_id: ['', Validators.required],
      permiso_id: ['', Validators.required]
    });

    this.segmento = 'funcionarios';

    this.getRoles();
    this.getPerfiles();
    this.getFuncionarios();
    this.getClientes();
    this.getPermisos();
    this.getRolesPorPermiso();
  }

  getRolesPorPermiso() {
    this.http.get('permiso/porRol/').then((data: any) => this.rolesPorPermiso = data.data);
  }
  getFuncionarios() {
    this.http.get('usuario/funcionario').then((data: any) => this.funcionarios = data.data);
  }

  getClientes() {
    this.http.get('usuario/cliente').then((data: any) => this.clientes = data.data);
  }

  getRoles() {
    this.http.get('rol').then((data: any) => this.roles = data.data);
  }

  getPermisos() {
    this.http.get('permiso').then((data: any) => this.permisos = data.data);
  }

  getPerfiles() {
    this.http.get('perfil').then((data: any) => this.perfiles = data.data);
  }

  guardarFuncionario(item) {
    let modal = this.modalCtrl.create(RegistroFuncionarioPage, { data: item });
    modal.onDidDismiss(data => {
      this.getFuncionarios();
    });
    modal.present();
  }

  guardarCliente(item) {
    let modal = this.modalCtrl.create(RegistroClientePage, { data: item });
    modal.onDidDismiss(data => {
      this.getClientes();
    });
    modal.present();
  }

  updateItem($event, rol: Rol, permiso: Permiso) {

    if ($event.checked) {

    }
    else {

    }
  }
}
