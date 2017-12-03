import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private principal = 0;
    private value = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private pocketService: PocketServiceProvider
    ) {
        for (var i = 0; i < this.pocketService._pockets.length; ++i) {
            if (this.pocketService._pockets[i].type_id == 0)
                this.principal += this.pocketService._pockets[i].money;
        }
        
        for (i = 0; i < this.pocketService._pockets.length; ++i) {
            if (this.pocketService._pockets[i].type_id == 2)
                this.value += this.pocketService._pockets[i].money;
        }
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

}
