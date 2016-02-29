const toPath = points => {
  let d = '';
  let i = 0;

  const firstPoint = points[ i ];

  for ( let point of points ) {
    const isFirstPoint = i === 0;
    const isLastPoint = i === points.length - 1;
    const prevPoint = isFirstPoint ? null : points[ i - 1 ];
    const { curve = false, x, y } = point;

    if ( isFirstPoint ) {
      d += `M${ x },${ y }`;
    } else if ( curve && curve.type === 'arc' ) {
      const { largeArcFlag = 0, rx, ry, sweepFlag = 0, xAxisRotation = 0 } = point.curve;

      d += `A${ rx },${ ry },${ xAxisRotation },${ largeArcFlag },${ sweepFlag },${ x },${ y }`;

      if ( isLastPoint && x === firstPoint.x && y === firstPoint.y ) {
        d += 'Z';
      }
    } else if ( isLastPoint && x === firstPoint.x && y === firstPoint.y ) {
      d += 'Z';
    } else if ( x !== prevPoint.x && y !== prevPoint.y ) {
      d += `L${ x },${ y }`;
    } else if ( x !== prevPoint.x ) {
      d += `H${ x }`;
    } else if ( y !== prevPoint.y ) {
      d += `V${ y }`;
    }

    i++;
  }

  return d;
};

export default toPath;
