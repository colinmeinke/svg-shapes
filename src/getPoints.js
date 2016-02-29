const getPoints = ( type, attributes ) => {
  switch ( type ) {
    case 'circle':
      return getPointsFromCircle( attributes );
    case 'line':
      return getPointsFromLine( attributes );
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

const getPointsFromLine = ({ x1, x2, y1, y2 }) => {
  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
  ];
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

const getPointsFromRect = ({ height, width, x, y }) => {
  return [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
    { x, y },
  ];
};

export default getPoints;
