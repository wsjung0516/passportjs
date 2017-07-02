import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    //temUrl:string ='';
    temUrl:string ='login-image.png';
    photo:string = 'file:///D:/angular/0601loginMEAN/mean-angular2-registration-login-example/client/app/home/login-image.png';

    constructor(
        private router: Router,
        private login: LoginService,
        private userService: UserService
        ) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(_id: string) {
        var data={
            id:_id
        };
        this.userService.deleteUser(data).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        //this.userService.getAll().subscribe(users => { this.users = users; });
        this.userService.getUsers()
            .map(res => res.json())
            .subscribe( res => {
            this.users = res})
    }
    logout() {
        this.login.logout()
            .subscribe(res => {
                if(res.success === 'true') {
                    this.router.navigate(['/login']);
                }
            });
    }

}