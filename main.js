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
loader.load("./cake.glb", function (glb) {
  console.log(glb);
  root = glb.scene;
  scene.add(root);
});
//lightning
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 5);
THREE.DirectionalLight.castShadow = true;
scene.add(directionalLight);

//renderer
const renderer = new THREE.WebGLRenderer({});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.gamaOutput = true;

//control
const controls = new OrbitControls(camera, renderer.domElement);

//animate
const animate = () => {
  //rotation
  if (root) root.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
