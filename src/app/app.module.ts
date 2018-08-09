import { RegistroTramitePage } from './../pages/registro-tramite/registro-tramite';
import { ConfiguracionPage } from './../pages/configuracion/configuracion';
import { MenuClientePage } from './../pages/menu-cliente/menu-cliente';
import { MenuAdminPage } from './../pages/menu-admin/menu-admin';
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

import { MyApp } from './app.component';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';
import { RegistroClientePage } from '../pages/registro-cliente/registro-cliente';
import { UserProvider } from '../providers/user/user';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuAdminPage,
    MenuClientePage,
    ConfiguracionPage,
    UsuariosPage,
    ConsultasPage,
    CitasPage,
    TramitesPage,
    RegistroClientePage,
    RegistroTramitePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuAdminPage,
    MenuClientePage,
    ConfiguracionPage,
    UsuariosPage,
    ConsultasPage,
    CitasPage,
    TramitesPage,
    RegistroClientePage,
    RegistroTramitePage
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
