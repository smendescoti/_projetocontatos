import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  formPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get form(): any {
    return this.formPassword.controls;
  }

  onSubmit(): void {
    
    this.mensagem = '';
    this.spinnerService.show();

    this.usuarioService.postPassword(this.formPassword.value)
      .subscribe({
        next: (result) => {
          this.mensagem = `Recuperação de senha para o usuário ${result.nome} realizada com sucesso.`;
          this.spinnerService.hide();
        },
        error: (e) => {
          console.log(e);
          this.mensagem = 'Não foi possível realizar a recuperação da senha.';
          this.spinnerService.hide();
        }
      })
  }
}
