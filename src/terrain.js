const average = numbers => {
  const valid = numbers.filter(number => undefined !== number && 0 !== number);
  const total = valid.reduce((sum, val) => sum + val, 0);
  return total / valid.length;
};

const terrainObject = function(detailLevel) {
  const size = Math.pow(2, detailLevel) + 1;
  let heightMap = new Float32Array(size * size);
  return {
    get: (x, y) => heightMap[x + (size) * y],
    set: (x, y, val) => heightMap[x + (size)  * y] = val,
    heightMap: heightMap,
    size: size,
    maxXY: size - 1,
  };
};

/**
 * Generate random terrain using diamond-square algorithm.
 *
 * Code adapted from @hunterloftis (https://github.com/hunterloftis/playfuljs-demos/blob/gh-pages/terrain/index.html)
 */
const diamondSquareGeneration = (terrain, roughness = 0.7) => {
  // Set corners
  terrain.set(0, 0, 0.1);
  terrain.set(terrain.maxXY, 0, 0.1);
  terrain.set(0, terrain.maxXY, 0.1);
  terrain.set(terrain.maxXY, terrain.maxXY, 0.1);

  const square = (x, y, size, offset) => {
    const avg = average([
      terrain.get(x - size, y - size),
      terrain.get(x + size, y - size),
      terrain.get(x + size, y + size),
      terrain.get(x - size, y + size),
    ]);
    terrain.set(x, y, avg + offset);
  };

  const diamond = (x, y, size, offset) => {
    const avg = average([
      terrain.get(x, y - size),
      terrain.get(x + size, y),
      terrain.get(x, y + size),
      terrain.get(x - size, y),
    ]);
    terrain.set(x, y, avg + offset);
  };

  const divide = (size) => {
    const half = size / 2;
    if (half < 1) return;
    const scale = size * roughness;

    for (let y = half; y < terrain.maxXY; y += size) {
      for (let x = half; x < terrain.maxXY; x += size) {
        square(x, y, half, Math.random() * scale * 2 - scale);
      }
    }

    for (let y = 0; y <= terrain.maxXY; y += half) {
      for (let x = (y + half) % size; x <= terrain.maxXY; x += size) {
        diamond(x, y, half, Math.random() * scale * 2 - scale);
      }
    }

    divide(half);
  };

  divide(terrain.maxXY);
};

const generate = (detailLevel) => {
  let terrain = terrainObject(detailLevel);

  diamondSquareGeneration(terrain);

  return terrain;
};

export default {
  generate
};
