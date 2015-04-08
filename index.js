var computeFaceNormals = require('normals').faceNormals;

function writeVector(vec, buf, off) {
  buf.writeFloatLE(vec[0], off + 0);
  buf.writeFloatLE(vec[1], off + 4);
  buf.writeFloatLE(vec[2], off + 8);
}

function serialize(cells, positions, faceNormals) {
  faceNormals = faceNormals || computeFaceNormals(cells, positions);

  var size = 80 + 4 + cells.length * (3 * 4 * 4 + 2);
  var buf = new Buffer(size);
  var off = 0;

  buf.fill(0, 0, 80); // zero-fill header
  off += 80;

  buf.writeUInt32LE(cells.length, off); // triangle count
  off += 4;

  for(var i=0; i < cells.length; i++) {
    writeVector(faceNormals[i], buf, off);
    off += 12; // 3 floats

    for(var j=0; j < 3; j++) {
      writeVector(positions[cells[i][j]], buf, off);
      off += 12;
    }

    buf.writeUInt16LE(0, off); // attribute byte count
    off += 2;
  }

  return buf;
}

module.exports = serialize;