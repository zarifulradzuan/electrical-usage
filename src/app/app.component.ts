import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DisplayPage } from '../pages/display/display';


import { CalculatePage } from '../pages/calculate/calculate';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = CalculatePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToCalculate(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CalculatePage);
  }goToDisplay(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DisplayPage);
  }
}
