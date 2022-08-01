import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/validators/password-match.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    //declarando e inicializando o HttpClient
    //injeção de dependência
    private httpClient: HttpClient
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
    //fazendo uma requisição POST para o serviço
    //de cadastro de usuário da API
    this.httpClient.post(
      'http://contatosapi-001-site1.atempurl.com/api/register',
      this.formRegister.value
    )
      .subscribe({
        //capturar o retorno de sucesso (HTTP 2xx)
        next: (data) => {
          console.log(data);
        },
        //capturar o retorno de erro (HTTP 4xx, 5xx)
        error: (e) => {
          console.log(e.error);
        }
      })
  }
}
