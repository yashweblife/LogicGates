import { World } from "./lib";
const world = new World();

function animation() { 
    world.update(); 
    requestAnimationFrame(animation) 
} 
animation()