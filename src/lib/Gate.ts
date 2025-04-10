import { Canvas, mouse } from ".";


export class GateInput {
  state = false;
  constructor(public parent:any, public offset:number=0){}
  draw(canvas: Canvas) {
    const {x,y} = this.parent.pos;
    const {w} = this.parent.size;
    canvas.fillArc(x,y+this.offset,10,"rgb(14, 14, 14)");
  }
}
export class GateOutput {
  state = false;
  constructor(public parent:any, public offset:number=0){}
  draw(canvas: Canvas) {
    const {x,y} = this.parent.pos;
    const {w} = this.parent.size;
    canvas.fillArc(x+w,y+this.offset,10,"rgb(14, 14, 14)");
  }
}
export default class Gate {
  inputs: GateInput[] = [];
  outputs: GateOutput[] = [];
  pos = { x: 0, y: 0 };
  size = { w: 0, h: 0 };
  constructor(public name: string) {}
  isMouseOver(){
    if(mouse.pos.x>this.pos.x&&mouse.pos.x<this.pos.x+this.size.w&&mouse.pos.y>this.pos.y&&mouse.pos.y<this.pos.y+this.size.h){
      return true
    }
    return false
  }
  showIsMoseOver(canvas:Canvas){
    if(this.isMouseOver()){
      canvas.fillRect(this.pos.x,this.pos.y,this.size.w,this.size.h,"rgba(255,255,255,0.2)")
    }
  }
  drawMenuGate(canvas:Canvas){}
  draw(canvas: Canvas) {}
}
export class AND extends Gate{
  inputA: GateInput;
  inputB: GateInput;
  output: GateOutput;
  state = false;
  pos: { x: number; y: number } = { x: 0, y: 0 };
  size: { w: number; h: number }= { w: 70, h: 50 };
  constructor(){
    super("AND")
    const sh = this.size.h/2
    const ssh = sh/2
    this.inputA = new GateInput(this, ssh);
    this.inputB = new GateInput(this, ssh+sh);
    this.output = new GateOutput(this, sh);
  }
  logic(){
    this.output.state = this.inputA.state && this.inputB.state
  }
  draw(canvas: Canvas) {
    canvas.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h, "rgb(83, 76, 76)");
    const textBounds = {
      x: this.pos.x,
      y: this.pos.y,
      w: this.name.length * 16,
      h: 16
    }
    canvas.text(this.name,
    textBounds.x + textBounds.w/2,
    textBounds.y + textBounds.h*1.5  
    , "rgb(255,255,255)");
    this.inputA.draw(canvas);
    this.inputB.draw(canvas);
    this.output.draw(canvas);
    this.showIsMoseOver(canvas);
  }
} 
export class OR extends Gate{
  inputA: GateInput;
  inputB: GateInput;
  output: GateOutput;
  state = false;
  pos: { x: number; y: number } = { x: 0, y: 0 };
  size: { w: number; h: number }= { w: 70, h: 50 };
  constructor(){
    super("OR")
    const sh = this.size.h/2
    const ssh = sh/2
    this.inputA = new GateInput(this, ssh);
    this.inputB = new GateInput(this, ssh+sh);
    this.output = new GateOutput(this, sh);
  }
  logic(){
    this.output.state = this.inputA.state || this.inputB.state
  }
  draw(canvas: Canvas) {
    canvas.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h, "rgb(83, 76, 76)");
    const textBounds = {
      x: this.pos.x,
      y: this.pos.y,
      w: this.name.length * 16,
      h: 16
    }
    canvas.text(this.name,
    textBounds.x + textBounds.w/2,
    textBounds.y + textBounds.h*1.5  
    , "rgb(255,255,255)");
    this.inputA.draw(canvas);
    this.inputB.draw(canvas);
    this.output.draw(canvas);
    this.showIsMoseOver(canvas);
  }
}