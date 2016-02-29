const getPoints = ( type, attributes ) => {
  switch ( type ) {
    case 'circle':
      return getPointsFromCircle( attributes );
    case 'ellipse':
      return getPointsFromEllipse( attributes );
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
