import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { API_URL } from '../../../globals';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    providers:[],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {

  // Dados para o formulário
  displayedColumns: string[] = ['nome', 'status'];
  dataSource!: UserData[];
  isLoading = false;
  classScreen = '';

  formGroup = new FormGroup({
    nome: new FormControl<string | undefined>('', [Validators.required]),
    email: new FormControl<string | undefined>('', [Validators.required]),
    contato: new FormControl<string | undefined>('', [Validators.required]),
    servidor: new FormControl<string | undefined>('', [Validators.required]),
    service: new FormControl<string | undefined>('', [Validators.required]),
    description: new FormControl<string | undefined>('', [Validators.required]),
  })

  constructor(
    private request: RequestService,
    private toastr: ToastrService, 
    private responsive: BreakpointObserver) {

     }

  ngOnInit(): void {
    this.request.get(API_URL+"?route=pedidos")
      .subscribe({
        next: (value: any) => {
          this.dataSource = (value.rows);
        },
      })


      this.responsive.observe((Breakpoints.Small, Breakpoints.XSmall))
      .subscribe(result => {
        this.classScreen = result.matches ? 'flexSmall' : '';
      })
        
    
  }
  // Método para lidar com o envio do formulário
  onSubmit() {
    this.isLoading = true;
    this.formGroup.disable();

    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify(this.formGroup.getRawValue())
    };

    fetch(API_URL+"?route=criarPedido", requestData as RequestInit)
      .then(response => {
        this.toastr.success('Formulário enviado com sucesso'); 
        this.dataSource.push({nome:this.formGroup.getRawValue().nome as string, status:"EM FILA"})
      }).catch(error => {
        this.toastr.error('Error ao tentar enviar formulario'); 
      }).finally(() => {
        this.isLoading = false;
        this.formGroup.enable();
      });

  }

  getStatusClass(status: string): string {
    return status.replace(/ /g, '_').toLowerCase();
  }


}

