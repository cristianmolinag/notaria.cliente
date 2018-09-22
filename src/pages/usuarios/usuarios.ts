import { UserProvider } from './../../providers/user/user';
import { RegistroFuncionarioPage } from './../registro-funcionario/registro-funcionario';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Rol, Perfil, Usuario, Permiso, rolesPorPermiso } from '../../models/global';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { RegistroPerfilPage } from '../registro-perfil/registro-perfil';

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
  usuario: Usuario;

  rol: Rol;
  perfil: Perfil;
  isFuncionario: Boolean;
  isAdministrador: Boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: HttpProvider,
    private user: UserProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private frmBuilder: FormBuilder) {

    this.isFuncionario = false;

    this.getUsuario();

    this.validarPerfil(this.user.getUsuario());


    this.frmPermiso = this.frmBuilder.group({
      rol_id: ['', Validators.required],
      permiso_id: ['', Validators.required]
    });

    this.segmento = 'perfil';

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

  getUsuario() {

    this.usuario = this.user.getUsuario();
  }

  editarPerfil() {
    let modal = this.modalCtrl.create(RegistroPerfilPage, { data: this.usuario });
    modal.onDidDismiss(data => {
      this.getUsuario();
    });
    modal.present();
  }

  validarPerfil(usuario: any) {

    switch (usuario.perfil.nombre) {
      case "Funcionario":
        this.isFuncionario = true;
        this.isAdministrador = false;
        break;
      case "Funcionario":
        this.isFuncionario = false;
        this.isAdministrador = true;
        break;
      default:
        break;
    }
  }

}
