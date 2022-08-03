import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthHelper } from 'src/app/helpers/auth-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private spinnerService: NgxSpinnerService,
    private authHelper: AuthHelper
  ) { }

  ngOnInit(): void {
  }

  //construir a estrutura do formulário
  formLogin = new FormGroup({
    //campo 'email'
    email: new FormControl('', [Validators.required, Validators.email]),
    //campo 'senha'
    senha: new FormControl('', [Validators.required])
  });

  //função para acessar e exibir os erros de validação do formulário
  get form(): any {
    return this.formLogin.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.spinnerService.show();

    this.usuarioService.postLogin(this.formLogin.value)
      .subscribe({
        next: (auth) => {
          this.authHelper.signIn(auth);
          this.spinnerService.hide();
          window.location.href = "/contatos-consulta";
        },
        error: (e) => {
          switch (e.status) {
            case 401:
              this.mensagem = e.error.message;
              break;
            default:
              this.mensagem = 'Falha ao autenticar, por favor tente mais tarde.';
              break;
          }
          this.spinnerService.hide();
        }
      })
  }

}
