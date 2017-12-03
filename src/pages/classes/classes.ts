import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';


/**
 * Generated class for the ClassesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-classes',
    templateUrl: 'classes.html',
})
export class ClassesPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClassesPage');
    }

    showAchievements(_class: String) {
        let achievementsModal = this.modalCtrl.create(LoginPage, {_class: _class});
        achievementsModal.present();
    }

}
