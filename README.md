serialize-stl-binary
====================
### STL binary serialization

Produces a [STL](http://en.wikipedia.org/wiki/STL_%28file_format%29) (STereoLithography) binary buffer from a mesh. Face normals are computed internally if not provided.

Install
-------

```bash
$ npm install serialize-stl-binary
```

Usage
-----

```javascript
var serializeSTL = require('serialize-stl-binary');
var fs = require('fs');

var mesh = {
  positions: [
    [-1.0, 0.0, 0.0],
    [ 0.0, 1.0, 0.0],
    [ 1.0, 0.0, 0.0]
  ],
  cells: [
    [0, 1, 2]
  ]
};

var buf = serializeSTL(mesh.cells, mesh.positions/*, faceNormals*/);
fs.writeFileSync('mesh.stl', buf);
```