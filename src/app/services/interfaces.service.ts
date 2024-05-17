import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { ToastrService } from 'ngx-toastr';
import { API_URL } from '../../globals';

@Injectable({
    providedIn: 'root' // Isso registra o serviço como um provedor raiz, tornando-o disponível em todo o aplicativo
})
export class InterfacesService {

    dadosUser!:UserData | null;
    interfacesUser = [];
    pagamento:any = null;
    status = "VERIFICANDO.."

    constructor(
        private request: RequestService,
        private toastr:ToastrService
        ) {}

    verificarHashFoiCadastrada(hash:string){
        if(this.pagamento.status !== "approved"){
            this.toastr.error("Pagamento ainda não foi aprovado!");
            return;
        }

        this.request.get(`${API_URL}?hash=${hash}`).subscribe({
            next:(value:UserData) => {
                this.dadosUser = value;
                console.log(this.dadosUser)
            },error(err) {
                console.log(err)
            },
        })


    }




}


interface UserData{
    status:string,
    nome:string,
    email:string,
    idTransation:string,
    interface:string,
    codigoUser:string
}