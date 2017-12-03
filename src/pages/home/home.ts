import { Component } from '@angular/core';
import { AchievementsPage } from '../../pages/achievements/achievements';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  handleMenuItem(pagename) {
  	switch (pagename) {
  		case "achievements":
  			this.navCtrl.setRoot(AchievementsPage);
  			break;
  		default:
  			break;
  	}
  }

}
