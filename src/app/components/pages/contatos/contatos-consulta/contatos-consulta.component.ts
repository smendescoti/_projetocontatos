import { Component, OnInit } from '@angular/core';
import { ContatoService } from 'src/app/services/contato.service';
import { Contato } from 'src/app/models/contato.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contatos-consulta',
  templateUrl: './contatos-consulta.component.html',
  styleUrls: ['./contatos-consulta.component.css']
})
export class ContatosConsultaComponent implements OnInit {

  //atributos
  contatos: Contato[] = [];
  pagina: number = 1;
  filtro: any = { nome: '' };

  constructor(
    private contatoService: ContatoService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinnerService.show();

    this.contatoService.getContatos()
      .subscribe({
        next: (result) => {
          this.spinnerService.hide();
          this.contatos = result;
        },
        error: (e) => {
          this.spinnerService.hide();
          console.log(e);
        }
      })
  }

  //função para o componente de paginação
  handlePageChange(event: any): void {
    this.pagina = event;
  }

}
