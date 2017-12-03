import { Component } from '@angular/core';
import { AchievementsPage } from '../../pages/achievements/achievements';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { PocketServiceProvider } from '../../providers/pocket-service/pocket-service';
import { KeeptPage } from '../../pages/keept/keept';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {


    constructor(
        public navCtrl: NavController,
        public pocketService: PocketServiceProvider,
        public modalCtrl: ModalController,
        public loadingCtrl: LoadingController
    ) {
    }

    ionViewDidEnter() {
        this.loader = this.loadingCtrl.create({
            content: 'Cargando perfil..'
        });
        this.loader.present();
        this.pocketService.pockets(null).subscribe(
            response => {
                this.pocketService._pockets = response;
                this.loader.dismiss();
            }
        );
    }

    handleMenuItem(pagename) {
        switch (pagename) {
            case "keept":
                let keeptModal = this.modalCtrl.create(KeeptPage);
                keeptModal.present();
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
