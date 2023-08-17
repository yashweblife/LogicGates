class Canvas{
    public dom: HTMLCanvasElement = document.createElement('canvas');
    public ctx: CanvasRenderingContext2D = this.dom.getContext('2d')!;
    constructor(parent:HTMLElement = document.body){
      parent.appendChild(this.dom);
    }
    public setSize(x:number, y:number){
      this.dom.width = x;
      this.dom.height = y;
    }
    public clear(){
      this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }
    public strokeArc(x:number, y:number, r:number, color:string = 'black'){
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.arc(x, y, r, 0, 2*Math.PI);
      this.ctx.stroke();
    }
    public strokeRect(x:number, y:number, w:number, h:number, color:string = 'black'){
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.rect(x, y, w, h);
      this.ctx.stroke();
    }
    public fillRect(x:number, y:number, w:number, h:number, color:string = 'black'){
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
    }
    public fillArc(x:number, y:number, r:number, color:string = 'black'){
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, r, 0, 2*Math.PI);
      this.ctx.fill();
    }
    public text(text:string, x:number, y:number, color:string = 'black'){
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, x, y);
    }
  }
  class Button{
    public dom: HTMLButtonElement = document.createElement('button');
    constructor(parent:HTMLElement = document.body){
      parent.appendChild(this.dom);
    }
    public setText(text:string){
      this.dom.innerText = text;
    }
    public onClick(callback:()=>void){
      this.dom.addEventListener('click', callback);
    }
  }
  class TruthTable{
    public inputs: number[][] = [];
    public outputs: number[][] = [];
    constructor(inputs:number[][], outputs:number[][]){
      this.inputs = inputs;
      this.outputs = outputs;
    }
    public setInputs(inputs:number[][]){
      this.inputs = inputs;
    }
    public setOutputs(outputs:number[][]){
      this.outputs = outputs;
    }
    public check(input:number[]){
      for(let i=0;i<this.inputs.length;i++){
        let match = true;
        for(let j=0;j<this.inputs[i].length;j++){
          if(this.inputs[i][j] != input[j]){
            match = false;
            break;
          }
        }
        if(match){
          return this.outputs[i];
        }
      }
      return [-1];
    }
  
  }
  
  class Output{
    public value = 0;
    public pos: number[] = [0, 0];
    public size: number = 10;
    constructor(){}
    public draw(c:Canvas){
      c.fillArc(this.pos[0], this.pos[1], this.size , this.value==1 ? 'red':'rgb(100,100,100)');
      c.strokeArc(this.pos[0], this.pos[1], this.size, 'white');
    }
    public update(value:number[]){
      this.value = value[0];
    }
  }
  
  class BlackBox{
    public pos: number[] = [0, 0];
    public size: number[] = [0, 0];
    public label: string = "";
    public truthTable: TruthTable;
    public value = 0;
    public next:(BlackBox|Output) | null=null;
    constructor(table:TruthTable){
      this.truthTable = table;
    }
    public setNext(next:BlackBox|Output){
      this.next = next;
    }
    public draw(c:Canvas){
      c.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1], 'rgb(100,100,100)');
      c.strokeRect(this.pos[0], this.pos[1], this.size[0], this.size[1], 'white');
      let offset = this.label.length*3;
      c.text(this.label, this.pos[0]+this.size[0]/2 - offset,  this.pos[1]+this.size[1]/2 + 4, 'white');
      let base = this.truthTable.inputs[0].length;
      let s = this.size[1]/base/2;
      for(let i=0;i<base;i++){
        c.fillRect(this.pos[0]-s/2, this.pos[1] + ((this.size[1])*i) - s/3, s, s,"black");
      }
      c.fillRect(this.pos[0] + this.size[0]-s/2,this.pos[1] + this.size[1]/2 -s/2, s, s,this.value==1 ? "red":"black");
    }  
    public setLabel(text:string){
      this.label = text;
    }
    public setTruthTable(table:TruthTable){
      this.truthTable = table;
    }
    public evaluate(input:number[]){
      return this.truthTable.check(input);
    }
    public update(input:number[]){
      if(this.next){
        let value = this.evaluate(input);
        if(value[0] != -1)
          this.value = value[0];
          this.next.update(value);
      }
    }
  }
  const b = new Button(document.querySelector('#buttons') as HTMLElement);
  b.setText("Clear");
  b.onClick(()=>{
    canvas.clear();
  })
  const canvas = new Canvas(document.querySelector('#canvas') as HTMLElement);
  canvas.setSize(500, 500);
  
  const components:any = []
  
  const AND = new BlackBox(new TruthTable([[0, 0], [0, 1], [1, 0], [1, 1]], [[0], [0], [0], [1]]));
  AND.pos = [10, 10];
  AND.size = [100, 50];
  AND.setLabel("AND");
  components.push(AND);
  
  const OR = new BlackBox(new TruthTable([[0, 0], [0, 1], [1, 0], [1, 1]], [[0], [1], [1], [1]]));
  OR.pos = [10, 80];
  OR.size = [100, 50];
  OR.setLabel("OR");
  components.push(OR);
  
  const OUTPUT = new Output();
  OUTPUT.pos = [320, 90];
  OUTPUT.size = 10;
  components.push(OUTPUT);
  
  const OUTPUT1 = new Output();
  OUTPUT1.pos = [320, 120];
  OUTPUT1.size = 10;
  components.push(OUTPUT1);
  
  
  OR.setNext(OUTPUT);
  
  function animate(){
    canvas.clear();
    canvas.fillRect(0, 0, 500, 500, 'rgb(70,50,70)');
    if(components.length>0){
      components.forEach((c:any)=>{
        c.update([0,1])
        c.draw(canvas);
      })  
    }
    requestAnimationFrame(animate);
  }
  animate();
  
  
  