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
});
