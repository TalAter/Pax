import * as THREE from 'three';

var scene, camera, renderer;

const init = function() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );
  camera.position.set(200, 200, 200);
  camera.lookAt( scene.position );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );

  let ambientLight = new THREE.AmbientLight( 0xaaaaaa );
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-0.3, 0.7, 0.6);
  directionalLight.position.normalize();
  scene.add(directionalLight);

  document.body.appendChild( renderer.domElement );
};

const render = function() {
  renderer.render(scene, camera);
};

const setBackgroundColor = function(color) {
  scene.background = new THREE.Color( color );
};

/**
 * Expose functionality
 */
export default {
  render,
  init,
  setBackgroundColor
};
