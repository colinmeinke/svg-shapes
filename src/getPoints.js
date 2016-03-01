const getPoints = ( type, attributes ) => {
  switch ( type ) {
    case 'circle':
      return getPointsFromCircle( attributes );
    case 'ellipse':
      return getPointsFromEllipse( attributes );
    case 'line':
      return getPointsFromLine( attributes );
    case 'path':
      return getPointsFromPath( attributes );
    case 'polygon':
      return getPointsFromPolygon( attributes );
    case 'polyline':
      return getPointsFromPolyline( attributes );
    case 'rect':
      return getPointsFromRect( attributes );
    default:
      throw new Error( 'Not a valid shape type' );
  }
};

const getPointsFromCircle = ({ cx, cy, r }) => {
  return [
    { x: cx, y: cy - r },
    { x: cx, y: cy + r, curve: { type: 'arc', rx: r, ry: r }},
    { x: cx, y: cy - r, curve: { type: 'arc', rx: r, ry: r }},
  ];
};

const getPointsFromEllipse = ({ cx, cy, rx, ry }) => {
  return [
    { x: cx, y: cy - ry },
    { x: cx, y: cy + ry, curve: { type: 'arc', rx, ry }},
    { x: cx, y: cy - ry, curve: { type: 'arc', rx, ry }},
  ];
};

const getPointsFromLine = ({ x1, x2, y1, y2 }) => {
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
};

const getPointsFromPath = ({ d }) => {
  const points = [];

  const instructions = d.split( /[^a-zA-Z]+/ ).filter( i => i.length );
  const numbers = d.split( /[^\-0-9.]+/ ).map( parseFloat ).filter( n => !isNaN( n ));

  const optionalArcKeys = [ 'xAxisRotation', 'largeArcFlag', 'sweepFlag' ];

  for ( let i = 0, l = instructions.length; i < l; i++ ) {
    const isFirstPoint = i === 0;
    const prevPoint = isFirstPoint ? null : points[ i - 1 ];

    let relative = false;

    switch ( instructions[ i ]) {
      case 'm':
      case 'l':
        relative = true;

      case 'M':
      case 'L':
        points.push({
          x: ( relative ? prevPoint.x : 0 ) + numbers.shift(),
          y: ( relative ? prevPoint.y : 0 ) + numbers.shift()
        });

        break;

      case 'h':
        relative = true;

      case 'H':
        points.push({
          x: ( relative ? prevPoint.x : 0 ) + numbers.shift(),
          y: prevPoint.y,
        });

        break;

      case 'v':
        relative = true;

      case 'V':
        points.push({
          x: prevPoint.x,
          y: ( relative ? prevPoint.y : 0 ) + numbers.shift(),
        });

        break;

      case 'a':
        relative = true;

      case 'A':
        points.push({
          curve: {
            type: 'arc',
            rx: numbers.shift(),
            ry: numbers.shift(),
            xAxisRotation: numbers.shift(),
            largeArcFlag: numbers.shift(),
            sweepFlag: numbers.shift(),
          },
          x: ( relative ? prevPoint.x : 0 ) + numbers.shift(),
          y: ( relative ? prevPoint.y : 0 ) + numbers.shift(),
        });

        for ( let k of optionalArcKeys ) {
          if ( points[ i ][ 'curve' ][ k ] === 0 ) {
            delete points[ i ][ 'curve' ][ k ];
          }
        }

        break;

      case 'z':
      case 'Z':
        points.push({ x: points[ 0 ].x, y: points[ 0 ].y });
        break;
    }
  }

  return points;
};

const getPointsFromPolygon = ({ points }) => {
  return getPointsFromPoints({ closed: true, points });
};

const getPointsFromPolyline = ({ points }) => {
  return getPointsFromPoints({ closed: false, points });
};

const getPointsFromPoints = ({ closed, points }) => {
  const numbers = points.split( /[\s,]+/ ).map( n => parseFloat( n ));

  const p = numbers.reduce(( arr, point, i ) => {
    if ( i % 2 === 0 ) {
      arr.push({ x: point });
    } else {
      arr[( i - 1 ) / 2 ].y = point;
    }

    return arr;
  }, []);

  if ( closed ) {
    p.push( p[ 0 ]);
  }

  return p;
};

const getPointsFromRect = ({ height, rx, ry, width, x, y }) => {
  if ( rx || ry ) {
    return getPointsFromRectWithCornerRadius({
      height,
      rx: rx ? rx : ry,
      ry: ry ? ry : rx,
      width,
      x,
      y,
    });
  }

  return getPointsFromBasicRect({ height, width, x, y });
};

const getPointsFromBasicRect = ({ height, width, x, y }) => {
  return [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
    { x, y },
  ];
};

const getPointsFromRectWithCornerRadius = ({ height, rx, ry, width, x, y }) => {
  const curve = { type: 'arc', rx, ry, sweepFlag: 1 };

  return [
    { x: x + rx, y },
    { x: x + width - rx, y },
    { x: x + width, y: y + ry, curve },
    { x: x + width, y: y + height - ry },
    { x: x + width - rx, y: y + height, curve },
    { x: x + rx, y: y + height },
    { x, y: y + height - ry, curve },
    { x, y: y + ry },
    { x: x + rx, y, curve },
  ];
};

export default getPoints;
