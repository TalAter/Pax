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
  const resolution = 100;
  let terrain = Terrain.generate(resolution);
  console.log(terrain);

  let geometry = new THREE.PlaneGeometry(2500, 2500, resolution-1, resolution-1);
  geometry.rotateX(-Math.PI / 2);

  let vertices = geometry.vertices;
  for (let x = 0; x < resolution; x++) {
    for (let y = 0; y < resolution; y++) {
      let vertexId = x + y * (resolution);
      vertices[vertexId].y = terrain.get(x, y)*30;
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
