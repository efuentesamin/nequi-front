import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ENVS } from '../../../config/environment';
import { HttpServiceProvider } from '../http-service/http-service';

const ENV = ENVS['dev_env'];

/*
  Generated class for the PocketServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PocketServiceProvider {

    private category;
    public _pockets = [];
    
    constructor(
        private http: Http,
        private httpService: HttpServiceProvider
    ) {
        console.log('Hello PocketServiceProvider Provider');
    }

    pockets(category) {
        this.category = category;
        let headers: Headers = this.httpService.getHeaders();
        return this.httpService.getApiToken().flatMap(data => {
            headers.append('Authorization', `Bearer ${data}`);

            if (this.category)
                return this.http.get(`${ENV.API_URL}/api/me/pockets?category=${category}`, { "headers": headers })
                    .map(res => res.json());
            else
                return this.http.get(`${ENV.API_URL}/api/me/pockets`, { "headers": headers })
                    .map(res => res.json());
        });
    }

    keept(money) {
        let headers: Headers = this.httpService.getHeaders();
        return this.httpService.getApiToken().flatMap(data => {
            headers.append('Authorization', `Bearer ${data}`);

            const params = {
                new_money: money
            };
            return this.http.post(`${ENV.API_URL}/api/me/update/pocket2/`, params, { "headers": headers })
                .map(res => res.json());
        });
    }

}
