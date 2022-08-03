import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthHelper } from "../helpers/auth-helper";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ContatosGuard implements CanActivate {

    constructor(
        private authHelper: AuthHelper,
        private router: Router
    ) {

    }

    canActivate() {
        //verificar se o usuário está autenticado
        var auth = this.authHelper.getAuthData();
        if (auth != null) {
            return true; //sucesso!
        }
        else {
            //redirecionar para a página de login
            this.router.navigate(['/acessar-conta']);
            return false;
        }
    }
}