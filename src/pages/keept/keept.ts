import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { PocketServiceProvider } from '../../providers/pocket-service/pocket-service';


/**
 * Generated class for the KeeptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-keept',
    templateUrl: 'keept.html',
})
export class KeeptPage {
    private loader;
    private principal = 0;
    private value = 0;
    private original = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private events: Events,
        private pocketService: PocketServiceProvider,
        public loadingCtrl: LoadingController
    ) {
        for (var i = 0; i < this.pocketService._pockets.length; ++i) {
            if (this.pocketService._pockets[i].type_id == 0)
                this.principal += this.pocketService._pockets[i].money;
        }
        
        for (i = 0; i < this.pocketService._pockets.length; ++i) {
            if (this.pocketService._pockets[i].type_id == 2)
                this.value += this.pocketService._pockets[i].money;
        }

        this.original = this.value;
        console.log(this.principal, this.value);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad KeeptPage');
    }

    add() {
        if (this.principal > 1000) {
            this.value += 1000;
            this.principal -= 1000;
        }
    }

    sub() {
        if (this.value > 1000) {
            this.value -= 1000;
            this.principal += 1000;
        }
    }

    send() {
        const money = this.value - this.original;
        this.loader = this.loadingCtrl.create({
            content: 'Guardando cambios'
        });
        this.loader.present();

        this.pocketService.keept(money).subscribe(
            response => {
                this.loader.dismiss();
                console.log(response);
                this.navCtrl.pop();

                if (response.goals_adquired) {
                    for (let i = 0; i < response.goals_adquired.length; ++i) {
                        this.events.publish('user:achievement', response.goals_adquired[i]);
                    }
                }
            }
        );
    }

}
