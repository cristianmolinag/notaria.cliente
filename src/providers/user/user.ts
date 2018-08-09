import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  usuario: Usuario;

  constructor(public http: HttpClient) {

  }


  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }
  getUsuario() {
    return this.usuario;
  }

}

export class Usuario {
  nombre: string;
  perfil: string;
  remember_token: string;
}

