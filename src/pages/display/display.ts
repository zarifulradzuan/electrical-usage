import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-display',
  templateUrl: 'display.html'
})
export class DisplayPage {
  usages: any = [];
  constructor(public navCtrl: NavController, private sqlite: SQLite) {
  }
  ionViewDidLoad(){
	  this.getData();
  }
  
  ionViewWillEnter(){
	  this.getData();
  }
  
  getData(){
	  this.sqlite.create({
		  name: 'ElectricityCalcDB.db',
		  location: 'default',
	  }).then((db: SQLiteObject) => {
		  db.executeSql('SELECT * FROM usage',[])
		  .then(res => {
			  this.usages = [];
			  for(var i = 0; i< res.rows.length; i++){
				  this.usages.push({kwhPrev:res.rows.item(i).kwhPrev, kwhCurr:res.rows.item(i).kwhCurr,
									kwhFirst:res.rows.item(i).kwhFirst, kwhAfter:res.rows.item(i).kwhAfter,
									kwhTotal:res.rows.item(i).kwhTotal})
			  }
		  })
		  .catch( e => console.log ('Error executing '+ e));
	  }).catch( e => console.log('Error creating sqlite object '+ e));
  }
  
}
