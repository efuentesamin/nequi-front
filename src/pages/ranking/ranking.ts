import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html',
})
export class RankingPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RankingPage');
    }

    chat(name, avatar) {
        let modal = this.modalCtrl.create(ChatPage, {name: name, avatar: avatar});
        modal.present();
    }
}
