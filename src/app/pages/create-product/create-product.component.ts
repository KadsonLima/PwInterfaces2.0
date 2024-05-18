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
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {

  // Dados para o formulário
  displayedColumns: string[] = ['nome', 'status'];
  dataSource!: UserData[];
  isLoading = false;
  classScreen = '';

  formGroup = new FormGroup({
    nome: new FormControl<string | undefined>('', [Validators.required]),
    versao: new FormControl<string | undefined>('', [Validators.required]),
    preco: new FormControl<string | undefined>('', [Validators.required]),
    images: new FormControl<string | undefined>('', [Validators.required]),
    imageFront: new FormControl<string | undefined>('', [Validators.required])
  })

  constructor(
    private request: RequestService,
    private toastr: ToastrService, 
    private responsive: BreakpointObserver) {

     }

  ngOnInit(): void {

    
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

    fetch(API_URL+"?route=criarNovoProduto", requestData as RequestInit)
      .then(response => {
        this.toastr.success('Formulário enviado com sucesso'); 
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

