import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AchievementsPage } from '../achievements/achievements';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


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
  @ViewChild(Slides) slides: Slides;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public authService: AuthServiceProvider
    ) {
    }

    ionViewDidEnter() {

        if (this.authService.personalInfo.main_role){
            if (this.authService.personalInfo.main_role.indexOf('Guardián')) {
                this.slides.slideTo(-1);
            } else if (this.authService.personalInfo.main_role.indexOf('Aventurero')) {
                this.slides.slideTo(0);
            } else if (this.authService.personalInfo.main_role.indexOf('Guerrero')) {
                this.slides.slideTo(1);
            }
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClassesPage');
    }

    showAchievements(category: String) {
        let achievementsModal = this.modalCtrl.create(AchievementsPage, {category: category});
        achievementsModal.present();
    }

}
