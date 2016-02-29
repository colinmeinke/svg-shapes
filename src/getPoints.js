const getPoints = ( type, attributes ) => {
  switch ( type ) {
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

const getPointsFromPolygon = ({ points }) => {
  return getPointsFromPoints({ points, closed: true });
};

const getPointsFromPolyline = ({ points }) => {
  return getPointsFromPoints({ points, closed: false });
};

const getPointsFromPoints = ({ points, closed }) => {
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
