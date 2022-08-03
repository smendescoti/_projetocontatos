import { Injectable } from "@angular/core";
import { AuthHelper } from "../helpers/auth-helper";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authHelper: AuthHelper
    ) {

    }

    //método para implementar o interceptador
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //verificar se a requisição que o httpCliente está fazendo para a API
        //é para o endpoint /api/contatos
        if (req.url.includes("/api/contatos")) {

            //recuperar o usuário autenticado no sistema
            var auth = this.authHelper.getAuthData();

            //enviar o token para a requisição da API
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${auth?.accessToken}` }
            });
        }

        return next.handle(req);
    }
}