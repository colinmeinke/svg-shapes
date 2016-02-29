# SVG shapes

Get point data from SVG shapes. Convert point data to an SVG path.

Current support:

- basic `rect`.

## Installation

```
npm install svg-shapes
```

## Usage

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'rect', {
  height: 20,
  width: 50,
  x: 10,
  y: 10,
});

console.log( points );

// [
//   { x: 10, y: 10 },
//   { x: 60, y: 10 },
//   { x: 60, y: 30 },
//   { x: 10, y: 30 },
//   { x: 10, y: 10 },
// ]

const path = toPath( points );

console.log( path );

// 'M10,10H60V30H10Z'
```
