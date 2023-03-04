import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

import {GLTFLoader} from "./GLTFLoader.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";





const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()



const loader = new GLTFLoader()
loader.load('./4.glb', function(glb){
  console.log(glb)
const root = glb.scene;
root.scale.set(0.3, 0.3, 0.3)
   scene.add(root);
}, function(xhr){
   console.log(xhr.loaded/xhr.total * 100 + "% loaded")
}, function(error){
   console.log("an error has occurred")
})

//light
const light = new THREE.AmbientLight(0xffffff, 0.6)
light.position.set(2,10,5)
scene.add(light)

const al = new THREE.AmbientLight(0xffffff, 0.25)
light.position.set(20,-10,-5)
scene.add( al )

const wl = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(8,3,8)
scene.add( wl )




//Boiler 

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 0.1, 1000)
camera.position.set(1,3,1)
camera.lookAt(scene.position)
scene.add(camera)



const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})

///orbit

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

///

renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4))
renderer.shadowMap.enabled = true
renderer.render(scene,camera)
renderer.setClearColor( 0xffffff, 0)

function animate(){
    controls.update();
requestAnimationFrame(animate)
renderer.render(scene,camera)
}
animate()





