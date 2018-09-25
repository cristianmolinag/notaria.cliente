import { FacturaPage } from './../factura/factura';
import { HttpProvider } from './../../providers/http/http';
import { UserProvider } from './../../providers/user/user';
import { Usuario, Busqueda, TipoTramite, Pago, Tramite, FormaPago } from './../../models/global';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'page-registro-pago',
  templateUrl: 'registro-pago.html',
})
export class RegistroPagoPage {

  frmRegistro: FormGroup;
  registro: any;
  busqueda: Busqueda;
  usuario: Usuario;
  tipo_tramite: TipoTramite;
  formasPago: FormaPago;
  observacion: string;
  pago: Pago;
  tramite: Tramite;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private user: UserProvider,
    private http: HttpProvider,
    private viewCtrl: ViewController,
    private frmBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) {

    this.usuario = user.getUsuario();
    this.registro = this.navParams.get('registro');
    this.busqueda = this.navParams.get('busqueda');
    this.tipo_tramite = new TipoTramite();

    this.http.get('tipo_tramite/' + this.busqueda.tipo_tramite).then((data: any) => this.tipo_tramite = data.data);
    this.http.get('forma_pago/').then((data: any) => this.formasPago = data.data);

    this.frmRegistro = this.frmBuilder.group({
      tramite_nombre: ['', { value: null, disabled: false }],
      tramite_valor: ['', { value: null, disabled: false }],
      cod_autorizacion: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4), Validators.pattern('\\d+')])],
      cod_transaccion: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(4), Validators.pattern('\\d+')])],
      forma_pago_id: ['', Validators.compose([Validators.required])],
      cliente_id: ['', { value: null, disabled: false }],
      tramite_id: ['', { value: null, disabled: false }],
      registro: ['', { value: null, disabled: false }],
    });
  }

  guardarPago() {
    this.frmRegistro.patchValue({
      tramite_id: this.tipo_tramite.id,
      tramite_nombre: this.tipo_tramite.nombre,
      tramite_valor: this.tipo_tramite.valor,
      cliente_id: this.usuario.id,
      registro: this.registro,
    });

    this.http.post('tramite', this.frmRegistro.value).then((data: any) => {
      if (data.data) {
        const toast = this.toastCtrl.create({
          message: "Registro creado con éxito",
          duration: 3000
        });
        toast.present();
        const modal = this.modalCtrl.create(FacturaPage, { data: this.frmRegistro.value });
        modal.onDidDismiss(data => {
          this.dismiss();
        });
        modal.present();
      } else {
        const toast = this.toastCtrl.create({
          message: "Error creando el registro",
          duration: 3000
        });
        toast.present();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
