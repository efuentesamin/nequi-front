import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClassesPage } from '../pages/classes/classes';
import { AchievementsPage } from '../pages/achievements/achievements';
import { AchievementDetailPage } from '../pages/achievement-detail/achievement-detail';
import { RankingPage } from '../pages/ranking/ranking';
import { KeeptPage } from '../pages/keept/keept';
import { ChatPage } from '../pages/chat/chat';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AchievementServiceProvider } from '../providers/achievement-service/achievement-service';
import { PocketServiceProvider } from '../providers/pocket-service/pocket-service';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        ClassesPage,
        AchievementsPage,
        AchievementDetailPage,
        RankingPage,
        KeeptPage,
        ChatPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        ClassesPage,
        AchievementsPage,
        AchievementDetailPage,
        RankingPage,
        KeeptPage,
        ChatPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        HttpServiceProvider,
        ErrorHandlerProvider,
        AuthServiceProvider,
    AchievementServiceProvider,
    PocketServiceProvider
    ]
})
export class AppModule { }
