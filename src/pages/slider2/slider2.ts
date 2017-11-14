import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Slider2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider2',
  templateUrl: 'slider2.html',
})
export class Slider2Page {
  @ViewChild('myCanvas') canvasEl : ElementRef;
  canvas: any;
  context: any;

  currentVal = 50;
  isLine = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.canvas = this.canvasEl.nativeElement;
    this.initializeCanvas();
  }

  initializeCanvas() {
    if(this.canvas.getContext)
    {
      this.context = this.canvas.getContext('2d');
      //TODO: set canvas with according to device
      this.canvas.height = 50;
      this.canvas.width = 600;
      this.drawCanvasBackground(this.isLine);
      this.drawCursor(this.calculateCursorPosition());
    }
  }

  drawCanvasBackground(isLine: boolean) {
    //clear background
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if(isLine){
      this.context.fillStyle = "black";
      this.context.fillRect(0, this.canvas.height/2-1, this.canvas.width, 2);
    }
    else {
      let gradient = this.context.createLinearGradient(this.canvas.width/2-300,0,this.canvas.width/2+300,0);
      gradient.addColorStop(0,"red");
      gradient.addColorStop(0.5,"yellow");
      gradient.addColorStop(1,"green");

      this.context.fillStyle = gradient;
      this.context.fillRect(0, 10, this.canvas.width, 30);
    }
  }

  drawCursor(x :number) {
    this.context.fillStyle = "black";
    this.context.fillRect(x, 5, 4, 40);
  }

  onChange(event: any) {
    this.currentVal = event.srcElement.valueAsNumber;
    this.drawCanvasBackground(this.isLine);
    this.drawCursor(this.calculateCursorPosition());
  }

  calculateCursorPosition(): number {
    const pos = this.currentVal * ((this.canvas.width - 4)/100);
    return pos;
  }

  adjustValue(adjustment: number, range: any) {
    if(this.currentVal + adjustment >= 0 && this.currentVal + adjustment <= 100) {
      range.valueAsNumber += adjustment;
      this.currentVal += adjustment;
      this.drawCanvasBackground(this.isLine);
      this.drawCursor(this.calculateCursorPosition());
    }
  }

  updateDisplay(event: any) {
    this.isLine = event.checked;
    this.drawCanvasBackground(this.isLine);
    this.drawCursor(this.calculateCursorPosition());
  }

}
