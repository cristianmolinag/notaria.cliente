import { RegistroPagoPage } from './../pages/registro-pago/registro-pago';
import { MenuPage } from './../pages/menu/menu';
import { RegistroCorregimientoPage } from './../pages/registro-corregimiento/registro-corregimiento';
import { RegistroCivilNacimientoPage } from './../pages/registro-civil-nacimiento/registro-civil-nacimiento';
import { RegistroTramitePage } from './../pages/registro-tramite/registro-tramite';
import { ConfiguracionPage } from './../pages/configuracion/configuracion';
import { HomePage } from './../pages/home/home';
import { UsuariosPage } from './../pages/usuarios/usuarios';
import { ConsultasPage } from './../pages/consultas/consultas';
import { CitasPage } from './../pages/citas/citas';
import { TramitesPage } from './../pages/tramites/tramites';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente';
import { UserProvider } from '../providers/user/user';
import { RegistroDepartamentoPage } from '../pages/registro-departamento/registro-departamento';
import { RegistroMunicipioPage } from '../pages/registro-municipio/registro-municipio';
import { RegistroFuncionarioPage } from '../pages/registro-funcionario/registro-funcionario';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ConfiguracionPage,
    UsuariosPage,
    ConsultasPage,
    CitasPage,
    TramitesPage,
    RegistroClientePage,
    RegistroTramitePage,
    RegistroCivilNacimientoPage,
    RegistroDepartamentoPage,
    RegistroMunicipioPage,
    RegistroCorregimientoPage,
    RegistroFuncionarioPage,
    RegistroPagoPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ConfiguracionPage,
    UsuariosPage,
    ConsultasPage,
    CitasPage,
    TramitesPage,
    RegistroClientePage,
    RegistroTramitePage,
    RegistroCivilNacimientoPage,
    RegistroDepartamentoPage,
    RegistroMunicipioPage,
    RegistroCorregimientoPage,
    RegistroFuncionarioPage,
    RegistroPagoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpProvider,
    UserProvider
  ]
})
export class AppModule { }
