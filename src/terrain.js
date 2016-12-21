const generate = (maxX, maxY) => {
  let heightMap = {};
  for (let x = 0; x < maxX; x++) {
    heightMap[x] = {};
    for (let y = 0; y < maxY; y++) {
      heightMap[x][y] = Math.random()-0.5;
    }
  }
  return heightMap;
};

export default {
  generate
};
