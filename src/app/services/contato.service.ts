import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contato } from "../models/contato.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContatoService {

    //construtor
    constructor(
        private httpClient: HttpClient
    ) {

    }

    //cadastrar um contato
    postContato(data: any): Observable<Contato> {
        return this.httpClient.post<Contato>(`${environment.apiContatos}/contatos`, data);
    }

    //atualizar um contato
    putContato(data: any): Observable<Contato> {
        return this.httpClient.put<Contato>(`${environment.apiContatos}/contatos`, data);
    }

    //excluir um contato
    deleteContato(id: string): Observable<Contato> {
        return this.httpClient.delete<Contato>(`${environment.apiContatos}/contatos/${id}`);
    }

    //consultar todos os contatos
    getContatos(): Observable<Contato[]> {
        return this.httpClient.get<Contato[]>(`${environment.apiContatos}/contatos`);
    }

    //consultar 1 contato através do ID
    getContato(id: string): Observable<Contato> {
        return this.httpClient.get<Contato>(`${environment.apiContatos}/contatos/${id}`);
    }
}