import expect from 'expect';

import getPoints from '../src/getPoints';

describe( 'getPoints', () => {
  it( 'should return correct points of a basic rect', () => {
    const attributes = { height: 20, width: 50, x: 10, y: 10 };

    const expectedPoints = [
      { x: 10, y: 10 },
      { x: 60, y: 10 },
      { x: 60, y: 30 },
      { x: 10, y: 30 },
      { x: 10, y: 10 },
    ];

    const points = getPoints( 'rect', attributes );

    expect( points ).toEqual( expectedPoints );
  });
});
