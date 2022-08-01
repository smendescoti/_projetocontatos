import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private spinnerService: NgxSpinnerService
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
          console.log(auth);
          this.spinnerService.hide();
        },
        error: (e) => {
          console.log(e.error);
          this.spinnerService.hide();
        }
      })
  }

}
