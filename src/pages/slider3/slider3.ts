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
  toched = false;
  lastTouch = [0,0];
  xOffset = 0;
  yOffset = -57;

  lineThickness = 2;
  lineY = 0;

  maxDotDistance = 4;

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
      this.lineY = this.canvas.height/2 - this.lineThickness/2;
      console.log("line y: " + this.lineY);
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
    this.context.fillRect(0, this.lineY, this.canvas.width, this.lineThickness);
  }

  onTouchStart() {

  }

  onTouchMove(event: TouchEvent) {
    //console.log("move: " + event.touches[0].pageX + "," + event.touches[0].pageY);
    const touchX = event.touches[0].pageX + this.xOffset;
    const touchY = event.touches[0].pageY + this.yOffset;
    if(!this.toched){
      this.toched = true;
      this.lastTouch[0] = touchX;
      this.lastTouch[1] = touchY;
    } else {
      this.fillInBlanks(touchX, touchY);
      this.lastTouch[0] = touchX;
      this.lastTouch[1] = touchY;
    }
  }

  getXDistance(pageX: number) {
    return Math.abs( pageX - this.lastTouch[0]);
  }

  getYDistance(pageY: number) {
    return Math.abs( pageY - this.lastTouch[1]);
  }

  fillInBlanks(pageX: number, pageY: number) {
    this.context.fillStyle = "blue";
    this.context.beginPath();
    this.context.moveTo(this.lastTouch[0],this.lastTouch[1]);
    this.context.lineTo(pageX,pageY);
    this.context.stroke();
    const boxWidth = this.getXDistance(pageX);
    const boxHeight = this.getYDistance(pageY);
    const smallestX = this.getSmallestValue(pageX, this.lastTouch[0]);
    const smallestY = this.getSmallestValue(pageY, this.lastTouch[1]);
    this.checkBoxCollision(smallestX, smallestY, boxWidth, boxHeight);
  }

  getSmallestValue(value1: number, value2: number): number {
    if (value1 < value2) {
      return value1;
    } else {
      return value2;
    }
  }

  onTouchStop() {
    this.toched = false;
    console.log('sto p');
  }

  checkBoxCollision(x: number, y: number, width: number, height: number){
    console.log('x: ' + x + ' y: ' + y + ' width: ' + width + ' height: ' + height);
    if (x >= this.xOffset && x <= this.xOffset + this.canvas.width) {
      // er is gedrukt binnen het canvas
      if ((y <= this.lineY && y + height >= this.lineY + this.lineThickness) || y == this.lineY) {
        // de berekende lijn raakt de schaal
        this.collisionPoint = (x + width/2)/this.canvas.width*100;
      }
    }
  }

  resetCanvas() {
    this.toched = false;
    console.log('reset');
    this.lastTouch = [0,0];
    this.drawCanvasBackground();
    this.collisionPoint = -1;
  }
}
