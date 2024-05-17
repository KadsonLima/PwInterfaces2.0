import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { RequestService } from '../../services/request.service';
import { MercadoPagoService } from '../../services/mercado-pago.service';
import { InterfacesService } from '../../services/interfaces.service';

export interface UserData {
  nome: string;
  status: string;
}



@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ListboxModule,
    MatListModule, MatButtonModule, MatProgressSpinnerModule,
    NgxMaskDirective],
  providers: [],
  templateUrl: './pagamentos.component.html',
  styleUrl: './pagamentos.component.scss'
})
export class PagamentoComponent implements OnInit , OnDestroy {

  // Dados para o formulário
  displayedColumns: string[] = ['nome', 'status'];
  dataSource!: UserData[];
  isLoading = false;

  formGroup = new FormGroup({
    hashPagamento: new FormControl<string>('', [Validators.required]),
  })

  registrarUserForm = new FormGroup({
    acessoCodigo: new FormControl<string>('', [Validators.required]),
    interface: new FormControl<string>('', [Validators.required]),   
  });

  constructor(
    private mercadopago: MercadoPagoService, 
    public interfaceService: InterfacesService, 
    private toastr: ToastrService,
  ) { }


  ngOnDestroy(): void {
    this.formGroup.reset();
    this.interfaceService.dadosUser = null;
    this.interfaceService.pagamento = null;
  }

  ngOnInit(): void {

  }
  // Método para lidar com o envio do formulário
  onSubmit() {
    const form = this.formGroup.getRawValue();
    this.mercadopago.verificarPagamento(form.hashPagamento as string).subscribe({
      next:(value:any)=>{
        this.interfaceService.pagamento = value;
        this.formGroup.disable();
        this.interfaceService.verificarHashFoiCadastrada(value.id);
      },error:()=>{
        this.toastr.error("Pagamento não encontrado!");
      }

    })

  }

  getStatusClass(status: string): string {
    return status.replace(/ /g, '_').toLowerCase();
  }


}

