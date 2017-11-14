import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Slider1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider1',
  templateUrl: 'slider1.html',
})
export class Slider1Page {
  currentValue = 50;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Slider1Page');
  }

  onChange(event: any) {
    console.log(event);
    this.currentValue = event.srcElement.valueAsNumber;
  }

}
