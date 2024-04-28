import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Isso registra o serviço como um provedor raiz, tornando-o disponível em todo o aplicativo
})
export class RequestService {
  readonly user = "?user=KasHinho"

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Accept': '*/*',
  });

  constructor(private http: HttpClient) { }


  get(url:string, params?:any){
    return this.http.get(url+this.user);
  }

  post(url:string, data:any){
    return this.http.post(url, data, {headers:this.headers});
  }

  delete(url:string){
    return this.http.delete(url+this.user);
  }

  put(url:string, data:any){
    return this.http.put(url+this.user, data);
  }

}
