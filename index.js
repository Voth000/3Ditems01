import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

import {GLTFLoader} from "./GLTFLoader.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

import {DragControls} from "./DragControls.js";





const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

//responsive



window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // renderer.render(scene, camera); // -> Not needed since it is called in animate()
});



//gltf

const loader = new GLTFLoader()
loader.load('./4.glb', function(glb){
  console.log(glb)
const root = glb.scene;
root.scale.set(2, 2, 2);
root.traverse(function(node) {
    if(node.isMesh)
    node.castShadow = true;
    node.receiveShadow = false;
})
   scene.add(root);
}, function(xhr){
   console.log(xhr.loaded/xhr.total * 100 + "% loaded")
}, function(error){
   console.log("an error has occurred")
})

//light
const light = new THREE.AmbientLight(0xffffff, 0.8)
light.position.set(2,10,5)

scene.add(light)

const al = new THREE.AmbientLight(0xFF00FF, 0.6)
al.position.set(20,-10,-5)

scene.add( al )

const wl = new THREE.DirectionalLight(0xFFFF00, 0.8)
wl.position.set(8,3,8)
wl.castShadow = true
scene.add( wl )

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry( 40, 30, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.rotateX( - Math.PI / 2);
scene.add( plane );
///grid

const grid = new THREE.GridHelper(0,0);
scene.add( grid );
//Boiler 

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 0.1, 1000)
camera.position.set(0,10,9)
camera.lookAt(scene.position)
scene.add(camera)



const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})

///plane



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





