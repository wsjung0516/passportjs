import {Component, DoCheck, Inject, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import {LoginService} from "../_services/login.service";
import {isUndefined} from "util";
import { DOCUMENT } from '@angular/platform-browser';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, DoCheck {
    model: any = {};
    loading = false;
    returnUrl: string;
    errMessage : string;
    tempUrl: string;

    constructor(
        @Inject(DOCUMENT) private document: any,
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
                this.tempUrl = result.url;
/*
                if( result.success === "true" ) {
                    this.router.navigate(['']);
                } else {
                    this.errMessage = "등록된 사용자가 아닙니다!!";
                }
*/
            });

    }
    facebookLogin() {
        this.loginService.facebookLogin()
            .subscribe( result => {
                this.tempUrl = result.url;
/*
                if( result.success === "true" ) {
                    this.router.navigate(['']);
                } else {
                    this.errMessage = "등록된 사용자가 아닙니다!!";
                }
*/
            });
    }
    ngDoCheck() {
        if( this.tempUrl) {
            this.document.location.href = this.tempUrl;
            console.log('this.tmepUrl', this.tempUrl);
        }
    }
}
