import * as THREE from 'three';

let scene, camera, renderer;

const faceIndices = [ 'a', 'b', 'c' ];

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

  let maxHeight = 0;
  let minHeight = 0;

  // Set height
  let vertices = geometry.vertices;
  for (let y = 0; y <= terrain.maxXY; y++) {
    for (let x = 0; x <= terrain.maxXY; x++) {
      let vertexId = x + y * (terrain.maxXY + 1);
      const height = terrain.get(x, y);
      maxHeight = height > maxHeight ? height : maxHeight;
      minHeight = height < minHeight ? height : minHeight;
      vertices[vertexId].y = height;
    }
  }

  const heightVariation = maxHeight - minHeight;

  // Color vertices based on height
  for (let faceId = 0; faceId < geometry.faces.length; faceId++) {
    let face = geometry.faces[faceId];
    for (let faceIndex = 0; faceIndex < 3; faceIndex++) {
      let vertex = vertices[face[faceIndices[faceIndex]]];
      const relativeHeight = (maxHeight - vertex.y) / heightVariation;
      let vertexColor = new THREE.Color(0xce985b);
      vertexColor.setHSL(0.0884,  relativeHeight/2 + 0.25, 0.75 - relativeHeight/2);
      face.vertexColors[faceIndex] = vertexColor;
    }
  }

  geometry.computeFlatVertexNormals();
  // geometry.computeVertexNormals();

  let material = new THREE.MeshLambertMaterial({ color: 0xce985b, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors });
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
