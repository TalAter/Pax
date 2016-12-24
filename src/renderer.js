import * as THREE from 'three';

var scene, camera, renderer;

const init = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000);
  camera.position.set(200, 300, 200);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width, height);

  let ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  let directionalLight = new THREE.DirectionalLight(0x777777);
  directionalLight.position.set(3, 7, 6);
  directionalLight.position.normalize();
  scene.add(directionalLight);

  document.body.appendChild(renderer.domElement);
};

const addPlane = (dimensionX, dimensionY, terrain) => {
  let geometry = new THREE.PlaneGeometry(dimensionX, dimensionY, terrain.maxXY, terrain.maxXY);
  geometry.rotateX(-Math.PI / 2);

  let vertices = geometry.vertices;
  for (let y = 0; y <= terrain.maxXY; y++) {
    for (let x = 0; x <= terrain.maxXY; x++) {
      let vertexId = x + y * (terrain.maxXY + 1);
      vertices[vertexId].y = terrain.get(x, y);
    }
  }
  geometry.computeFlatVertexNormals();
  // geometry.computeVertexNormals();

  let material = new THREE.MeshLambertMaterial({ color: 0xce985b, shading: THREE.SmoothShading });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
};

const render = () => {
  renderer.render(scene, camera);
};

const setBackgroundColor = (color) => {
  scene.background = new THREE.Color(color);
};

/**
 * Expose functionality
 */
export default {
  render,
  init,
  setBackgroundColor,
  addPlane,
};
