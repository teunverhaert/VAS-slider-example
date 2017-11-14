import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the Slider3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider3',
  templateUrl: 'slider3.html',
})
export class Slider3Page {
  @ViewChild('myCanvas') canvasEl : ElementRef;
  canvas: any;
  context: any;

  lineThickness = 2;

  collisionPoint = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
    console.log("tablet: " + platform.is('tablet'));
    console.log("fysical width: " + (window.devicePixelRatio * window.screen.width)/2.54);
  }

  ionViewDidLoad() {
    this.canvas = this.canvasEl.nativeElement;
    this.initializeCanvas();
  }

  initializeCanvas() {
    if(this.canvas.getContext)
    {
      this.context = this.canvas.getContext('2d');

      //TODO: set canvas with according to device (10cm smartphone / 20cm tablet)
      this.canvas.height = 100;
      this.canvas.width = 400;
      console.log("canvas width: " + this.canvas.width);
      this.drawCanvasBackground();
    }
  }

  drawCanvasBackground() {
    //clear background
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //draw line
    this.context.fillStyle = "black";
    this.context.fillRect(0, this.canvas.height/2-1, this.canvas.width, this.lineThickness);
  }

  onTouchStart() {

  }

  onTouchMove(event: TouchEvent) {
    //console.log("move: " + event.touches[0].pageX + "," + event.touches[0].pageY);
    this.drawDot(event.touches[0].pageX,event.touches[0].pageY-57);
  }

  onTouchStop() {

  }

  drawDot(x: number, y:number) {
    this.context.fillStyle = "black";
    this.context.fillRect(x, y, 2, 2);
    this.checkCollision(x,y);
  }

  checkCollision(x: number, y: number) {
    if(y>=this.canvas.height/2-this.lineThickness/2 && y<=this.canvas.height/2+this.lineThickness/2 && x >= 0 && x <= this.canvas.width) {
      this.collisionPoint = x/(this.canvas.width-1)*100;
    }
  }

  resetCanvas() {
    this.drawCanvasBackground();
    this.collisionPoint = -1;
  }
}
