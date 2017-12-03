import { Component } from '@angular/core';
import { AchievementsPage } from '../../pages/achievements/achievements';
import { NavController } from 'ionic-angular';
import { PocketServiceProvider } from '../../providers/pocket-service/pocket-service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    constructor(public navCtrl: NavController, public pocketService: PocketServiceProvider) {
        this.pocketService.pockets(null).subscribe(
            response => {
                console.log(response);
                this.pocketService._pockets = response;
            }
        );
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

    getNormalPockets() {
        var total = 0;
        for (var i = 0; i < this.pocketService._pockets.length; ++i) {
            if (this.pocketService._pockets[i].type_id == 1)
                total++;
        }

        return total;

    }

    getDisponible() {
        var total = 0;
        for (var i = 0; i < this.pocketService._pockets.length; ++i) {
            if (this.pocketService._pockets[i].type_id == 0 || this.pocketService._pockets[i].type_id == 1)
                total += this.pocketService._pockets[i].money;
        }

        return total;
    }

    getTotal() {
        var total = 0;
        for (var i = 0; i < this.pocketService._pockets.length; ++i) {
            total += this.pocketService._pockets[i].money;
        }

        return total;
    }

}
