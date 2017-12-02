import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        private events: Events,
        private authService: AuthServiceProvider,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ngOnInit(): void {
        this.authService.login('efuentesamin@gmail.com', 'zcerni.831027').subscribe(
            response => {
                console.log(response);
                this.storage.set('nequi_token', response.access_token).then(value => {
                    // this.me();
                    this.events.publish('user:logged-in');
                });
            },
            error => this.events.publish('http:error', error),
            () => {},
        )
    }
}
