import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthHelper } from "../helpers/auth-helper";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AccountGuard implements CanActivate {

    constructor(
        private authHelper: AuthHelper,
        private router: Router
    ) {

    }

    canActivate() {
        //verificar se o usuário está autenticado. Se sim, 
        //o usuário é redirecionado para a página de consulta de contatos
        var auth = this.authHelper.getAuthData();
        if (auth != null) {
            this.router.navigate(['/contatos-consulta']);
            return false;
        }
        else {
            return true;
        }
    }
}