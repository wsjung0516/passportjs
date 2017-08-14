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
        // let headers = new Headers();
        let headers = new Headers({ 'Access-Control-Request-Headers': "Content-Type", 'Content-Type': 'application/json'});
        headers.append('Access-Control-Request-Methods', 'POST');
        let options = new RequestOptions({ headers: headers });
        var data = {
            username : username,
            password : password
        };
        return this.http.post(this.config.apiUrl+'/api/auth/login', data)
            .map (res => res.json());

    }
    googleLogin() {

        const headers: Headers = new Headers();
        // headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Request-Method', 'Content-Type');

        const options = new RequestOptions({
            headers: headers
        });
        return this.http.get(this.config.apiUrl+'/api/auth/login/google')
            .map (res => {
                console.log("googleLogin res",res);
                return res;
            });

    }
    facebookLogin() {
        return this.http.get (this.config.apiUrl+'/api/auth/login/facebook')
            .map (res => {
                // console.log("res",res);
                return res;
            });

    }
    logout() {
        return this.http.get(this.config.apiUrl+'/api/auth/logout')
            .map (res => res.json());

    }
    handleError() {

    }
}
