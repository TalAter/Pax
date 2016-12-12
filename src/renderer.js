import * as THREE from 'three';

var scene, camera, renderer;

const init = function() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
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
