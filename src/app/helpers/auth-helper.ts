import { Injectable } from "@angular/core";
import { Auth } from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthHelper {

    //função para gravar os dados do usuário autenticado
    //na local storage do navegador
    signIn(auth: Auth): void {
        //serializar os dados do objeto para JSON
        var json = JSON.stringify(auth);
        //gravar na local storage
        localStorage.setItem("auth_data", json);
    }

    //função para ler os dados do usuário autenticado
    //na local storage e retorna-lo como objeto
    getAuthData(): Auth | null {
        //ler o conteudo gravado na local storage
        var json = localStorage.getItem("auth_data");
        //verificar se o valor não é vazio
        if (json != null) {
            //deserializar o json para objeto
            var auth = JSON.parse(json) as Auth;
            //retorno o objeto
            return auth;
        }
        else {
            //retornar vazio
            return null;
        }
    }

    //função para apagar o conteudo gravado
    //do usuário autenticado na local storage
    signOut(): void {
        //apagar o conteudo da local storage
        localStorage.removeItem("auth_data");
    }

}