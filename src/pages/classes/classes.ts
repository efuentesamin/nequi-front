import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AchievementsPage } from '../achievements/achievements';


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

    showAchievements(category: String) {
        let achievementsModal = this.modalCtrl.create(AchievementsPage, {category: category});
        achievementsModal.present();
    }

}
