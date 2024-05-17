import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Isso registra o serviço como um provedor raiz, tornando-o disponível em todo o aplicativo
})
export class RequestService {


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'mode': 'no-cors',
    'Accept': '*/*',
  });

  constructor(private http: HttpClient) { }


  get(url:string, params?:any):Observable<any>{
    return this.http.get(url, params);
  }

  post(url:string, data:any){
    return this.http.post(url, data, {headers:this.headers});
  }

  delete(url:string){
    return this.http.delete(url);
  }

  put(url:string, data:any){
    return this.http.put(url, data);
  }

}
