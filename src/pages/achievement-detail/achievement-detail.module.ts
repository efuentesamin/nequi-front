import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementDetailPage } from './achievement-detail';

@NgModule({
  declarations: [
    AchievementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementDetailPage),
  ],
})
export class AchievementDetailPageModule {}
