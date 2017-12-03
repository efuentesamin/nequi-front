import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  private list = [
  	{id: 50001, profile_pic: 'assets/imgs/person1.jpeg', name: 'Pedro Perez', points: [{category_id: 1, exp: 50}, {category_id: 2, exp: 70}, {category_id: 3, exp: 65}]},
  	{id: 50002, profile_pic: 'assets/imgs/person2.jpeg', name: 'Juan Velasquez', points: [{category_id: 1, exp: 70}, {category_id: 2, exp: 80}, {category_id: 3, exp: 30}]},
  	{id: 50003, profile_pic: 'assets/imgs/person3.jpeg', name: 'Claudia Jimenez', points: [{category_id: 1, exp: 55}, {category_id: 2, exp: 20}, {category_id: 3, exp: 20}]},
  	{id: 50004, profile_pic: 'assets/imgs/person4.jpeg', name: 'Angie Fuentes', points: [{category_id: 1, exp: 120}, {category_id: 2, exp: 55}, {category_id: 3, exp: 100}]},
  	{id: 50005, profile_pic: 'assets/imgs/person5.jpeg', name: 'Andrés Hernandez', points: [{category_id: 1, exp: 150}, {category_id: 2, exp: 85}, {category_id: 3, exp: 80}]}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider) {
  	this.list.push(this.authService.personalInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
  }

  pointsBy(category, points) { 
  	var exp = 0;	

	for (var i = 0; i < points.length; ++i) {
		if (points[i].category_id == category)
			exp = points[i].exp;
	}

	return exp;
  } 

  listBy(category) {

  	function compare(a,b) {
  		var expA = 0;
  		var expB = 0;

  		for (var i = 0; i < a.points.length; ++i) {
  			if (a.points[i].category_id == category)
  				expA = a.points[i].exp;
  		}

  		for (i = 0; i < b.points.length; ++i) {
  			if (b.points[i].category_id == category)
  				expB = b.points[i].exp;
  		}

  		return expB - expA;
	}

	this.list.sort(compare);

	return this.list;
  }

}
