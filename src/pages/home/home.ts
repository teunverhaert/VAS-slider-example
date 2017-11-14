import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Slider1Page} from '../slider1/slider1';
import {Slider2Page} from '../slider2/slider2';
import {Slider3Page} from '../slider3/slider3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slider1 = Slider1Page;
  slider2 = Slider2Page;
  tekenSlider = Slider3Page;

  currentVal = 50;
  canvas: any;
  context: any;
  mousedown = false;
  drawn = false;
  drawnPos = 0;

  platformWidth : number;

  @ViewChild('can') canvasEl : ElementRef;

  constructor(public navCtrl: NavController, public platform : Platform) {

  }

  ionViewDidLoad() {

  }

  initialiseCanvas()
  {
    if(this.canvas.getContext)
    {
      this.setupCanvas();
    }
  }

  setupCanvas()
  {
    this.context = this.canvas.getContext('2d');

    this.drawBackgroundLine();

    //this.drawInidactor();
  }

  drawBackgroundLine() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.platformWidth, 50);

    this.context.fillStyle = "black";
    this.context.fillRect(0, 24, this.platformWidth, 2);
  }

  drawBackground() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.platformWidth, 50);

    let gradient = this.context.createLinearGradient(this.platformWidth/2-300,0,this.platformWidth/2+300,0);
    gradient.addColorStop(0,"red");
    gradient.addColorStop(0.5,"yellow");
    gradient.addColorStop(1,"green");

    this.context.fillStyle = gradient;
    this.context.fillRect(0, 10, this.platformWidth, 30);

  }

  drawInidactor() {
    this.context.fillStyle = "black";
    this.context.fillRect(this.currentVal*5.98, 5, 2, 40);
  }

  changePage(page: any) {
    this.navCtrl.push(page);
  }

  onChange(event: any) {
    this.currentVal = event.srcElement.valueAsNumber;
    this.drawBackgroundLine();
    this.drawInidactor();
  }

  onMouseDown() {
    if(!this.drawn) {
      this.mousedown = true;
    }
  }

  onMouseUp() {
    this.mousedown = false;
  }

  onLeave() {
    this.mousedown = false;
  }

  onMouseMove(event: MouseEvent) {
    this.drawDot(event.x-16,event.y-76);
  }

  drawDot(x: number, y:number) {
    if(this.mousedown) {
      this.context.fillStyle = "black";
      this.context.fillRect(x, y, 2, 2);
      this.checkCollision(x,y);
    }
  }

  checkCollision(x: number, y: number) {
    if(y>=24 && y<=26) {
      this.drawn = true;
      this.drawnPos = x/599*100;
    }
  }

  resetCanvas() {
    this.drawn = false;
    this.drawnPos = 0;
    this.drawBackgroundLine();
  }

  onTouchStart(event: any) {
    this.onMouseDown();
  }

  onTouchMove(event: any) {
    this.drawDot(event.touches[0].pageX-16,event.touches[0].pageY-88);
  }
}
