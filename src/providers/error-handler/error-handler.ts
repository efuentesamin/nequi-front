import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorHandlerProvider {

    constructor(private storage: Storage, private events: Events) {
    }

    handle(error) {
        let message = '';

        if (error.error) {
            const response = JSON.parse(error.error);
            message = response.message || 'Ocurrió un error!';
        }
        
        switch (error.status) {
            case 401: {
                this.storage.remove('nequi_token');
                this.events.publish('user:logged-out');
                break;
            }
            default: {
                this.events.publish('http:error', message);
            }
        }
    }
}
