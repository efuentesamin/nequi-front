import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ENVS } from '../../../config/environment';
import { HttpServiceProvider } from '../http-service/http-service';

const ENV = ENVS['dev_env'];

/*
  Generated class for the AchievementServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AchievementServiceProvider {

  constructor(
        private http: Http,
        private httpService: HttpServiceProvider
        ) {
    console.log('Hello AchievementServiceProvider Provider');
  }

    achievements() {
        let headers: Headers = this.httpService.getHeaders();
        return this.httpService.getApiToken().flatMap(data => {
            headers.append('Authorization', `Bearer ${data}`);
            
            return this.http.get(`${ENV.API_URL}/api/goals`, {"headers": headers})
                .map(res => res.json());
        });
    }

    myAchievements() {
        let headers: Headers = this.httpService.getHeaders();
        return this.httpService.getApiToken().flatMap(data => {
            headers.append('Authorization', `Bearer ${data}`);
            
            return this.http.get(`${ENV.API_URL}/api/me/goals`, {"headers": headers})
                .map(res => res.json());
        });
    }

}
