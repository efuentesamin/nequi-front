import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events, AlertController, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClassesPage } from '../pages/classes/classes';
import { AchievementsPage } from '../pages/achievements/achievements';
import { AchievementDetailPage } from '../pages/achievement-detail/achievement-detail';
import { RankingPage } from '../pages/ranking/ranking';
import { KeeptPage } from '../pages/keept/keept';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = HomePage;
    public menuItems = [
        { label: 'Inicio', page: HomePage, icon: 'md-home' },
        { label: 'Clases', page: ClassesPage, icon: 'md-contacts' },
        { label: 'Logros', page: AchievementsPage, icon: 'md-trophy' },
        { label: 'Ranking', page: RankingPage, icon: 'md-people' },
        { label: 'Salir', page: null, icon: 'md-exit' },
    ];

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private storage: Storage,
        private events: Events,
        private alertController: AlertController,
        private authService: AuthServiceProvider,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
    ) {
        this.initializeApp();
        this.events.subscribe('user:logged-in', () => {
            // When user loggs in take him to home page
            this.rootPage = HomePage;
        });
        this.events.subscribe('user:logged-out', () => {
            // When user loggs out take him to login page
            this.rootPage = LoginPage;
        });
        this.events.subscribe('http:error', (error) => {
            this.handleError(error);
        });
        this.events.subscribe('user:achievement', (achievement) => {
            let alert = this.alertCtrl.create({
                title: 'Logro desbloqueado',
                message: 'Has desbloqueado el logro "' + achievement.name + '"!',
                buttons: [
                    {
                        text: 'Ok',
                        role: 'cancel'
                    },
                    {
                        text: 'Más',
                        handler: () => {
                            let modal = this.modalCtrl.create(AchievementDetailPage, {achievement: achievement});
                            modal.present();
                        }
                    }
                ]
            });
            alert.present();
        });

        // Ask whether user is logged in
        this.authService.isLoggedIn(loggedIn => {
            if (!loggedIn) {
                this.rootPage = LoginPage;
            } else {
                this.authService.me();
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    handleMenuItem(item) {
        //* There are menu items for pages and menu items for actions
        if (item.page) {
            this.nav.setRoot(item.page);
        } else {
            //* Handle actions
            switch (item.label) {
                case 'Salir': {
                    this.authService.logout();
                }
            }
        }
    }

    handleError(error) {
        console.log(error);
        // Default error message on http error
        let message = 'Ocurrió un error!';

        // Whether http error has a message
        if (error._body) {
            let response;
            try {
                response = JSON.parse(error._body);
            } catch (e) {
            }

            if (response) {
                message = response.message || 'Ocurrió un error!';
            }
        }

        switch (error.status) {
            case 401: {
                //* Unauthorized response. Remove token and send user to login
                this.storage.remove('nequi_token');
                this.events.publish('user:logged-out');
            }
            default: {
                // For other error codes present the alert message
                const alert = this.alertController.create({
                    title: 'Error',
                    subTitle: message,
                    buttons: ['OK']
                });
                alert.present();
            }
        }
    }
}
