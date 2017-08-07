import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import {LoginService} from "../_services/login.service";

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    errMessage : string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.loginService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        //this.loading = true;
        this.loginService.login(this.model.username, this.model.password)
            .subscribe( result => {
                if( result.success === "true" ) {
                    this.router.navigate(['']);
                } else {
                    this.errMessage = "등록된 사용자가 아닙니다!!";
                }
            });
    }
    googleLogin() {
        this.loginService.googleLogin()
            .subscribe( result => {
                if( result.success === "true" ) {
                    this.router.navigate(['']);
                } else {
                    this.errMessage = "등록된 사용자가 아닙니다!!";
                }
            });

    }
    facebookLogin() {
        let tempUrl = {
            nurl: ''
        };
        this.loginService.facebookLogin()
            .subscribe( result => {
                var tempId = document.getElementById('tempId');
                tempUrl.nurl = result.url;
                console.log("result",tempUrl.nurl);
/*
                tempId.innerHTML = result.body;
                if( result.success === "true" ) {
                    this.router.navigate(['']);
                } else {
                    this.errMessage = "등록된 사용자가 아닙니다!!";
                }
*/
            });
        setTimeout( () => {
            alert(tempUrl.nurl);
            window.open(tempUrl.nurl);

        },1000);

    }
}
