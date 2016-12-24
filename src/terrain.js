const terrainObject = function(resolution) {
  let heightMap = new Float32Array(resolution * resolution);
  return {
    get: (x, y) => heightMap[x + (resolution) * y],
    set: (x, y, val) => heightMap[x + (resolution)  * y] = val,
    heightMap: heightMap,
    resolution: resolution,
  };
};

const generate = (resolution) => {
  let terrain = terrainObject(resolution);

  for (let x = 0; x < resolution; x++) {
    for (let y = 0; y < resolution; y++) {
      terrain.set(x, y,  Math.random()-0.5);
    }
  }

  return terrain;
};

export default {
  generate
};
