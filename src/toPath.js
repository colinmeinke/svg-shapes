const toPath = points => {
  let d = '';
  let i = 0;

  const firstPoint = points[ i ];

  for ( let point of points ) {
    const isFirstPoint = i === 0;
    const isLastPoint = i === points.length - 1;
    const prevPoint = isFirstPoint ? null : points[ i - 1 ];

    if ( isFirstPoint ) {
      d += `M${ point.x },${ point.y }`;
    } else if ( isLastPoint && point.x === firstPoint.x && point.y === firstPoint.y ) {
      d += 'Z';
    } else if ( point.x !== prevPoint.x && point.y !== prevPoint.y ) {
      d += `L${ point.x },${ point.y }`;
    } else if ( point.x !== prevPoint.x ) {
      d += `H${ point.x }`;
    } else if ( point.y !== prevPoint.y ) {
      d += `V${ point.y }`;
    }

    i++;
  }

  return d;
};

export default toPath;
