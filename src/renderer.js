import * as THREE from 'three';
import Terrain from './terrain';

var scene, camera, renderer;

const init = function() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000);
  camera.position.set(200, 300, 200);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  // Create some random terrain
  const maxX = 100;
  const maxY = 100;
  let heightMap = Terrain.generate(maxX, maxY);
  heightMap[1][1] = 0.2;

  let geometry = new THREE.PlaneGeometry(2500, 2500, maxX-1, maxY-1);
  geometry.rotateX(-Math.PI / 2);

  let vertices = geometry.vertices;
  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      vertices[x + y * maxY].y = heightMap[x][y]*30;
    }
  }
  geometry.computeFlatVertexNormals();
  // geometry.computeVertexNormals();

  let material = new THREE.MeshLambertMaterial({ color: 0xdd8888, shading: THREE.SmoothShading });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0x777777);
  directionalLight.position.set(3, 7, 6);
  directionalLight.position.normalize();
  scene.add(directionalLight);

  document.body.appendChild(renderer.domElement);
};

const render = function() {
  renderer.render(scene, camera);
};

const setBackgroundColor = function(color) {
  scene.background = new THREE.Color(color);
};

/**
 * Expose functionality
 */
export default {
  render,
  init,
  setBackgroundColor
};
