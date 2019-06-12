import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-calculate',
  templateUrl: 'calculate.html'
})
export class CalculatePage {
	kwhAfter:number;
	kwhFirst:number;
	kwhCurr:number;
	kwhPrev:number;
	kwhTotal:number;
  constructor(public alertCtrl:AlertController, public navCtrl: NavController, private sqlite:SQLite) {
	  this.kwhAfter = 0.25;
	  this.kwhFirst = 0.35;
  }
  
  calculate(){
	  var total = this.kwhCurr-this.kwhPrev;
	  var totalPrice = 0;
	  if(total<200)
		  totalPrice = total* this.kwhFirst;
	  else{
		  totalPrice = 200 * this.kwhFirst;
		  total-=200;
		  totalPrice+= total* this.kwhAfter;
	  }
	  this.kwhTotal = totalPrice;
	  this.kwhPrev = this.kwhCurr;
	  this.kwhCurr=++this.kwhCurr;
	  
	  this.sqlite.create({
		  name: 'ElectricityCalcDB.db',
		  location: 'default',
	  }).then((db: SQLiteObject) => {
		  db.executeSql('CREATE TABLE IF NOT EXISTS usage(kwhPrev integer, kwhCurr integer, kwhFirst VARCHAR, kwhAfter VARCHAR, kwhTotal VARCHAR)', [])
		  .then(res => console.log('Executed SQL'))
		  .catch( e => console.log ('Error executing '+ e));
	  }).catch( e => console.log('Error creating sqlite object '+ e));
	  
	  this.sqlite.create({
		  name: 'ElectricityCalcDB.db',
		  location: 'default',
	  }).then((db: SQLiteObject) => {
		  db.executeSql('INSERT INTO usage(kwhPrev, kwhCurr, kwhFirst, kwhAfter, kwhTotal) VALUES (?,?,?,?,?)', 
		  [this.kwhPrev, this.kwhCurr, this.kwhFirst, this.kwhAfter, this.kwhTotal])
		  .then(res => console.log(res))
		  .catch( e => console.log ('Error executing '+ e));
	  }).catch( e => console.log('Error creating sqlite object '+ e));
	  
	  let alert = this.alertCtrl.create({
		  title:'Usage Added',
		  subTitle:'Your usage is : RM '+ this.kwhTotal,
		  buttons:['Continue']
	  });
	  alert.present();
  }
  
}
