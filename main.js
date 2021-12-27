import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 2, 2);
//model
let root;
const loader = new GLTFLoader();
loader.load("./cake.glb", (glb) => {
  root = glb.scene;
  scene.add(root);
});
//lightning
const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
scene.add(light);

//renderer
const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.gamaOutput = true;

//onClick

var isMouseDown = false;

function init() {
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
}

function onMouseDown() {
  isMouseDown = true;
}

function onMouseUp() {
  isMouseDown = false;
}
const move = () =>{
 
  root.rotation.y+=0.002;
}
//control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;

init();

//animate
let animate = () => {
  //rotation

  if (root) {
    controls.update();
if(!isMouseDown)
setTimeout(()=>{
  move();
},2000)
 


   

   
   
         
          
           
             

    
     
   
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
