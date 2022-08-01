import { Injectable } from "@angular/core";
import { Usuario } from '../models/usuario.model';
import { Auth } from "../models/auth.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    //construtor
    constructor(
        //declarando e inicializando HttpClient
        private httpClient: HttpClient
    ) {
    }

    //método para executar a chamada de cadastro de usuário na API
    postRegister(data: any): Observable<Usuario> {
        return this.httpClient.post<Usuario>(`${environment.apiContatos}/register`, data);
    }

    //método para executar a chamada de login de usuário na API
    postLogin(data: any): Observable<Auth> {
        return this.httpClient.post<Auth>(`${environment.apiContatos}/login`, data);
    }
}