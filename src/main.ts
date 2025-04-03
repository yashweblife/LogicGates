import { World } from "./lib";



const world = new World();
function animation(){
  world.update()
  world.draw()
  requestAnimationFrame(animation);
}
animation()