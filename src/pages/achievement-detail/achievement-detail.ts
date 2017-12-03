import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AchievementDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-achievement-detail',
  templateUrl: 'achievement-detail.html',
})
export class AchievementDetailPage {

	private achievement = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.achievement = navParams.get('achievement');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementDetailPage');
  }

}
