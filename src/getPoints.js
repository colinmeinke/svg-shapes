const getPoints = ( type, attributes ) => {
  switch ( type ) {
    case 'rect':
      return getPointsFromRect( attributes );
    default:
      throw new Error( 'Not a valid shape type' );
  }
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
