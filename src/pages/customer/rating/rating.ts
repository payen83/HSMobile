import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonProvider, Jobs } from '../../../providers/providers';

/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  rating: number;
  feedback: string;
  constructor(public viewCtrl: ViewController, public common: CommonProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.rating = 0;
    this.feedback = null;
  }

  ionViewDidLoad() {
  }

  showColor(num){
    return this.rating >= parseInt(num);
  }

  clickRating(ratingNum){
    this.rating = ratingNum;
  }

  close(){
    this.viewCtrl.dismiss();
  }

  submitRating(){
    if(this.rating == 0){
      this.common.showAlert('', 'Please rate at least 1 star');
    } else {
      if(!this.feedback) {
        this.feedback = ' ';
      }
      this.viewCtrl.dismiss({rating: this.rating, feedback: this.feedback});
    }
  }

}
