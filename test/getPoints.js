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

  it( 'should return correct points of a polyline', () => {
    const attributes = { points: '20,30 50,90 20,90 50,30' };

    const expectedPoints = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
    ];

    const points = getPoints( 'polyline', attributes );

    expect( points ).toEqual( expectedPoints );
  });
});
