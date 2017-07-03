/**
 * Created by Master on 2017-06-27.
 */
import { Injectable } from '@angular/core';
import { Jsonp, Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';
import {errorHandler} from "@angular/platform-browser/src/browser";

@Injectable()
export class LoginService {

    constructor(private jsonp:Jsonp, private http: Http, private config: AppConfig) {}

    login(username: string, password: string) {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });
        var data = {
            username : username,
            password : password
        };
        return this.http.post(this.config.apiUrl+'/api/auth/login', data,options )
            .map (res => res.json());

    }
    googleLogin() {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.config.apiUrl+'/api/auth/login/google',{},options)
            .map (res => res.json());

    }
    facebookLogin() {
        return this.jsonp.get (this.config.apiUrl+'/api/auth/login/facebook',{})
            .map (res => res.json());

    }
    logout() {
        return this.http.get(this.config.apiUrl+'/api/auth/logout')
            .map (res => res.json());

    }
    handleError() {

    }
}
