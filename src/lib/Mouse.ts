export default class Mouse {
    x: number = 0;
    y: number = 0;
    rightClick: boolean = false;
    down: boolean = false;
    click: boolean = false;
    lastDown: boolean = false;
    constructor(){
        window.addEventListener('mousemove', (e) => {this.x = e.clientX; this.y = e.clientY;});
        window.addEventListener('mousedown', (e) => {this.down = true;});
        window.addEventListener('mouseup', (e) => {this.down = false;});
        window.addEventListener('contextmenu', (e) => {e.preventDefault();});
        window.addEventListener('click', (e) => {this.click = true;setTimeout(() => {this.click = false}, 50);});
    }
}
export const mouse = new Mouse();