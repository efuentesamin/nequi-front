import { Component } from '@angular/core';
import { AchievementsPage } from '../../pages/achievements/achievements';
import { NavController } from 'ionic-angular';
import {PocketServiceProvider} from '../../providers/pocket-service/pocket-service';
import { KeeptPage } from '../../pages/keept/keept';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private pockets = [];

  constructor(public navCtrl: NavController, public pocketService: PocketServiceProvider) {
  	this.pocketService.pockets(null).subscribe(
  			response => {
  				console.log(response);
  				this.pockets = response;
  			}
  		);
  }

  handleMenuItem(pagename) {
  	switch (pagename) {
  		case "keept":
  			this.navCtrl.setRoot(KeeptPage);
  			break;
  		case "achievements":
  			this.navCtrl.setRoot(AchievementsPage);
  			break;
  		default:
  			break;
  	}
  }

  getNormalPockets() {
  	var total = 0;
  	for (var i = 0; i < this.pockets.length; ++i) {
  		if (this.pockets[i].type_id == 1)
  			total++;
  	}

  	return total;

  }

  getDisponible() {
  	var total = 0;
  	for (var i = 0; i < this.pockets.length; ++i) {
  		if (this.pockets[i].type_id == 0 || this.pockets[i].type_id == 1)
  			total += this.pockets[i].money;
  	}

  	return total;
  }

  getTotal() {
  	var total = 0;
  	for (var i = 0; i < this.pockets.length; ++i) {
  			total += this.pockets[i].money;
  	}

  	return total;
  }

}
