import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ENVS } from '../../../config/environment';

import { HttpServiceProvider } from '../http-service/http-service';

const ENV = ENVS['dev_env'];


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

    public personalInfo: any = {};

    constructor(
        private http: Http,
        private storage: Storage,
        private events: Events,
        private httpService: HttpServiceProvider
    ) {
    }

    isLoggedIn(callback) {
        this.storage.get('nequi_token')
            .then(value => callback(!!value))
            .catch(error => callback(false));
    }

    login(user: String, password: String) {
        const params = {
            grant_type: 'password',
            client_id: 2,
            client_secret: 'p0rNO2SBPnEIf1aLJ9ZbzI9ph0jmUPqi9TT7CFJQ',
            username: user,
            password: password,
            scope: '*'
        };
        return this.http.post(`${ENV.API_URL}/oauth/token/`, params).map(res => res.json());
    }

    logout() {
        this.storage.remove('app_token');
        this.events.publish('user:logged-out');
    }

    me() {
        let headers: Headers = this.httpService.getHeaders();
        this.httpService.getApiToken().flatMap(data => {
            headers.append('Authorization', `Bearer ${data}`);
            
            return this.http.get(`${ENV.API_URL}/api/v1/me`, {"headers": headers})
                .map(res => res.json());
        }).subscribe(
            response => {
                if (response.birthday) {
                    response.birthday = new Date(response.birthday);
                }
                this.personalInfo.name = response.name;
                this.personalInfo.firstName = response.first_name;
                this.personalInfo.lastName = response.last_name;
                this.personalInfo.birthday = response.birthday;
                this.personalInfo.email = response.email;
                this.personalInfo.profilePicture = response.picture_url;
                this.personalInfo.city = response.location;
            },
            error => this.events.publish('http:error', error),
            () => {},
        );
    }
}
