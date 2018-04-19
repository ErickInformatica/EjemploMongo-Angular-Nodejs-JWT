import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Users } from "../models/users.model";
import { GLOBAL } from "../services/global.service";

@Injectable()
export class UsersService{
    public url: string;
    public token;
    public identity;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    registrar(user: Users): Observable<any>{
        let params = JSON.stringify(user);
        let headers =  new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'registrar', params, {headers: headers});
    }

    login(user, gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers =  new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    updateUser(user: Users):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
    }

    getIdentity(){
        var identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }

}