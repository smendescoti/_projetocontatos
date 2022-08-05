import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/services/contato.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contatos-edicao',
  templateUrl: './contatos-edicao.component.html',
  styleUrls: ['./contatos-edicao.component.css']
})
export class ContatosEdicaoComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private contatoService: ContatoService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //capturar o id enviado pela URL (rota)
    var idContato = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultar os dados do contato na API atraves do id
    this.spinnerService.show();

    this.contatoService.getContato(idContato)
      .subscribe({
        next: (result) => {
          this.spinnerService.hide();
          //preenche o formulário com os dados do contato
          this.formContato.patchValue(result);
        },
        error: (e) => {
          this.spinnerService.hide();
          console.log(e);
        }
      })
  }

  formContato = new FormGroup({
    idContato: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
  });

  get form(): any {
    return this.formContato.controls;
  }

  onSubmit(): void {

    this.spinnerService.show();
    this.mensagem = '';

    this.contatoService.putContato(this.formContato.value)
      .subscribe({
        next: (result) => {
          this.spinnerService.hide();
          this.mensagem = `Contato "${result.nome}" atualizado com sucesso.`
        },
        error: (e) => {
          this.spinnerService.hide();
          console.log(e);
        }
      })
  }

}
