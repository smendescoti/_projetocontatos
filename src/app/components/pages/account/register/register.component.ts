import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/validators/password-match.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //atributos (campos que poderão acessar na página HTML)
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    //injeção de dependência
    private usuarioService: UsuarioService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  //estrutura do formulário
  formRegister = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    senhaConfirmacao: new FormControl('', [Validators.required])
  },
    //incluir as validações customizadas para este formulário
    {
      validators: [PasswordMatchValidator.MatchPassword]
    }
  );

  //função para ler os campos do formulário
  get form(): any {
    return this.formRegister.controls;
  }

  //função para capturar o evento SUBMIT do formulário
  onSubmit(): void {

    //exibindo o Spinner
    this.spinnerService.show();

    //limpar as mensagens
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    //executando a chamada da API através do MIDDLEWARE
    this.usuarioService.postRegister(this.formRegister.value)
      .subscribe({
        //capturar o retorno de sucesso (HTTP 2xx)
        next: (usuario) => {
          this.spinnerService.hide();

          this.mensagem_sucesso = `Usuário ${usuario.nome}, cadastrado com sucesso.`;
          this.formRegister.reset(); //limpar os campos do formulário          
        },
        //capturar o retorno de erro (HTTP 4xx, 5xx)
        error: (e) => {
          switch (e.status) {
            case 422:
              this.mensagem_erro = e.error.message;
              break;
            default:
              this.mensagem_erro = 'Falha ao realizar cadastro, por favor tente mais tarde.';
              break;
          }
          this.spinnerService.hide();
        }
      })
  }
}
