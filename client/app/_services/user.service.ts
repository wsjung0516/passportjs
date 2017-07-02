import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http, private config: AppConfig) { }

/*
    getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
    }
*/

    // private helper methods

/*
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
*/

    getUsers() {
        //return this.http.get('http://localhost:3000/api/user/');
        return this.http.get(this.config.apiUrl+'/api/user/');
    }

    addUser(data:any) {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });

        // return this.http.post('http://localhost:3000/adduser', JSON.stringify(data), options)
        return this.http.post(this.config.apiUrl+'/api/user/add', JSON.stringify(data), options)
            .map(res => res.json());
    }
    updateUser(data:any) {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.config.apiUrl+'/api/user/update', JSON.stringify(data), options)
            .map(res => res.json());
    }
    deleteUser(data:any) {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });
        var delid = data.id;
        return this.http.post(this.config.apiUrl+'/api/user/delete', JSON.stringify(data), options)
            .map(res => res.json());
    }

}