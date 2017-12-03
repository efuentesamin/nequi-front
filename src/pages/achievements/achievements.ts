import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController  } from 'ionic-angular';
import {AchievementDetailPage} from '../achievement-detail/achievement-detail';
import {AchievementServiceProvider} from '../../providers/achievement-service/achievement-service';

/**
 * Generated class for the AchievementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage {

  private loader;
	private achievements = [];
  private category;
  private categories = ['Todos', 'Guardián', 'Aventurero', 'Guerrero'];
  private category_imgs = ['default', 'insignia-guardian', 'insignia-explorador', 'insignia-guerrero'];

  constructor(
  	public navCtrl: NavController,
   	public navParams: NavParams,
   	public achievementService: AchievementServiceProvider,
   	public modalCtrl: ModalController,
    public loadingCtrl: LoadingController 
  ) {
    this.category = navParams.get('category');
    this.loader = loadingCtrl.create({
      content: 'Cargando listado de triunfos...'
    });
    this.loader.present();
  	achievementService.achievements(this.category).subscribe(
  		response => {
  			this.achievements = response;
        this.loader.dismiss();
  		}
  	);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsPage');
  }

  viewDetails(achievement) {
  	let achievementModal = this.modalCtrl.create(AchievementDetailPage, {achievement: achievement});
  	achievementModal.present();
  }

}
