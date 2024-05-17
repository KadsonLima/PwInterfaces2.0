import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root' // Isso registra o serviço como um provedor raiz, tornando-o disponível em todo o aplicativo
})
export class MercadoPagoService {
    readonly URL_API = 'https://api.mercadopago.com';
    readonly ACCESS_TOKEN = 'APP_USR-2647263948970299-071310-16635365a3edaf09db4d2c626b8d576e-251834149';

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.ACCESS_TOKEN}`,
        'X-Idempotency-Key': '0d5020ed-1af6-469c-ae06-c3bec19954bb',
        'Access-Control-Allow-Origin': '*',
        'Accept': '*/*',
    });

    constructor(private httpClient: HttpClient) {

    }

    // Método para verificar a hash de pagamento

    criarPagamento() {
        this.httpClient.post(`${this.URL_API}/v1/payments`, {headers:this.headers})
    }

    verificarPagamento(id:string):Observable<StatusPagamento> {
        return this.httpClient.get(`${this.URL_API}/v1/payments/${id}`, {headers:this.headers}) as Observable<StatusPagamento>
    }




}


interface StatusPagamento{
    status: string,
    description:string,

}