**DEPRECIATED**: Moved to [svg-points](https://github.com/colinmeinke/svg-points).
All further work will happen over there.

# SVG shapes

Get point data from SVG shapes. Convert point data to an SVG path.

**1.9kb gzipped. No dependencies.**

Shapes supported:

- [Circle](#circle)
- [Ellipse](#ellipse)
- [Line](#line)
- [Path](#path)
- [Polygon](#polygon)
- [Polyline](#polyline)
- [Rect](#rect)
- [Rect (with corner radius)](#rect-with-corner-radius)

## Installation

```
npm install svg-shapes
```

## Usage

### Circle

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'circle', {
  cx: 50,
  cy: 50,
  r: 20,
});

console.log( points );

// [
//   { x: 50, y: 30 },
//   { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
//   { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
// ]

const path = toPath( points );

console.log( path );

// 'M50,30A20,20,0,0,0,50,70A20,20,0,0,0,50,30Z'
```

### Ellipse

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'ellipse', {
  cx: 100,
  cy: 300,
  rx: 65,
  ry: 120,
});

console.log( points );

// [
//   { x: 100, y: 180 },
//   { x: 100, y: 420, curve: { type: 'arc', rx: 65, ry: 120 }},
//   { x: 100, y: 180, curve: { type: 'arc', rx: 65, ry: 120 }},
// ]

const path = toPath( points );

console.log( path );

// 'M100,180A65,120,0,0,0,100,420A65,120,0,0,0,100,180Z'
```

### Line

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'line', {
  x1: 10,
  x2: 50,
  y1: 70,
  y2: 200,
});

console.log( points );

// [
//   { x: 10, y: 70 },
//   { x: 50, y: 200 },
// ]

const path = toPath( points );

console.log( path );

// 'M10,70L50,200'
```

### Path

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'path', {
  d: 'M20,20h50v20A2,2,0,0,1,80,35L90,30H50V50a5,5,45,1,0,-5,-10l-5,-10Z',
});

console.log( points );

// [
//   { x: 20, y: 20 },
//   { x: 70, y: 20 },
//   { x: 70, y: 40 },
//   { x: 80, y: 35, curve: {
//     type: 'arc',
//     rx: 2,
//     ry: 2,
//     sweepFlag: 1,
//   }},
//   { x: 90, y: 30 },
//   { x: 50, y: 30 },
//   { x: 50, y: 50 },
//   { x: 45, y: 40, curve: {
//     type: 'arc',
//     rx: 5,
//     ry: 5,
//     largeArcFlag: 1,
//     xAxisRotation: 45,
//   }},
//   { x: 40, y: 30 },
//   { x: 20, y: 20 },
// ]

const path = toPath( points );

console.log( path );

// 'M20,20H70V40A2,2,0,0,1,80,35L90,30H50V50A5,5,45,1,0,45,40L40,30Z'
```

### Polygon

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'polygon', {
  points: '20,30 50,90 20,90 50,30',
});

console.log( points );

// [
//   { x: 20, y: 30 },
//   { x: 50, y: 90 },
//   { x: 20, y: 90 },
//   { x: 50, y: 30 },
//   { x: 20, y: 30 },
// ]

const path = toPath( points );

console.log( path );

// 'M20,30L50,90H20L50,30Z'
```

### Polyline

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'polyline', {
  points: '20,30 50,90 20,90 50,30',
});

console.log( points );

// [
//   { x: 20, y: 30 },
//   { x: 50, y: 90 },
//   { x: 20, y: 90 },
//   { x: 50, y: 30 },
// ]

const path = toPath( points );

console.log( path );

// 'M20,30L50,90H20L50,30'
```

### Rect

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

### Rect (with corner radius)

```js
import { getPoints, toPath } from 'svg-shapes';

const points = getPoints( 'rect', {
  height: 200,
  rx: 5,
  ry: 10,
  width: 500,
  x: 50,
  y: 50,
});

console.log( points );

// [
//   { x: 55, y: 50 },
//   { x: 545, y: 50 },
//   { x: 550, y: 60, curve: {
//     type: 'arc',
//     rx: 5,
//     ry: 10,
//     sweepFlag: 1,
//   }},
//   { x: 550, y: 240 },
//   { x: 545, y: 250, curve: {
//     type: 'arc',
//     rx: 5,
//     ry: 10,
//     sweepFlag: 1,
//   }},
//   { x: 55, y: 250 },
//   { x: 50, y: 240, curve: {
//     type: 'arc',
//     rx: 5,
//     ry: 10,
//     sweepFlag: 1,
//   }},
//   { x: 50, y: 60 },
//   { x: 55, y: 50, curve: {
//     type: 'arc',
//     rx: 5,
//     ry: 10,
//     sweepFlag: 1,
//   }},
// ]

const path = toPath( points );

console.log( path );

// 'M55,50H545A5,10,0,0,1,550,60V240A5,10,0,0,1,545,250H55A5,10,0,0,1,50,240V60A5,10,0,0,1,55,50Z'
```
