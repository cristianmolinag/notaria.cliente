import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProvider {
  apiUrl: string;
  httpOptions: any;

  constructor(public http: HttpClient) {
    this.apiUrl = 'http://192.168.0.102:8000/api/'; //cambiar la IP por la nueva
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
  }

  post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + url, JSON.stringify(data), this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  put(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + url, JSON.stringify(data), this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get(url: string) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + url, this.httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
