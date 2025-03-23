export default class Canvas {
    public dom: HTMLCanvasElement = document.createElement('canvas');
    public ctx: CanvasRenderingContext2D = this.dom.getContext('2d')!;
    constructor(parent: HTMLElement = document.body) {
        parent.appendChild(this.dom);
        this.dom.width = window.innerWidth;
        this.dom.height = window.innerHeight;
    }
    get w(){
        return this.dom.width;
    }
    get h(){
        return this.dom.height;     
    }
    public setSize(x: number, y: number) {
        this.dom.width = x;
        this.dom.height = y;
    }
    public clear() {
        this.ctx.clearRect(0, 0, this.dom.width, this.dom.height);
    }
    public strokeArc(x: number, y: number, r: number, color: string = 'black') {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    public strokeRect(x: number, y: number, w: number, h: number, color: string = 'black') {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
    }
    public fillRect(x: number, y: number, w: number, h: number, color: string = 'black') {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
    }
    public fillArc(x: number, y: number, r: number, color: string = 'black') {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    public text(text: string, x: number, y: number, color: string = 'black') {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }
    public line(x1: number, y1: number, x2: number, y2: number, color: string = 'black') {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    public moveTo(x: number, y: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }
    public lineTo(x: number, y: number) {
        this.ctx.lineTo(x, y);
    }
    public stroke() {
        this.ctx.stroke();
    }
    public fill() {
        this.ctx.fill();
    }
    public close() {
        this.ctx.closePath();
    }

}

export const canvas = new Canvas();
