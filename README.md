# SVG shapes

Get point data from SVG shapes. Convert point data to an SVG path.

Current shapes supported:

- [Line](#line)
- [Polygon](#polygon)
- [Polyline](#polyline)
- [Rect](#rect) (**note**: no rx/ry support yet)

## Installation

```
npm install svg-shapes
```

## Usage

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
