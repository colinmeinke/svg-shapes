import expect from 'expect';

import toPath from '../src/toPath';

describe( 'toPath', () => {
  it( 'should return correct path from basic rect points', () => {
    const points = [
      { x: 10, y: 10 },
      { x: 60, y: 10 },
      { x: 60, y: 30 },
      { x: 10, y: 30 },
      { x: 10, y: 10 },
    ];

    const expectedPath = 'M10,10H60V30H10Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from polyline points', () => {
    const points = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
    ];

    const expectedPath = 'M20,30L50,90H20L50,30';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });
});
