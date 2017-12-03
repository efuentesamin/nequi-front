import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

    private value = 1000;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad KeeptPage');
    }

    add() {
        this.value += 1000;
    }

    sub() {
        if (this.value > 1000) {
            this.value -= 1000;
        }
    }

}
