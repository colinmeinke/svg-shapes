import expect from 'expect';

import toPath from '../src/toPath';

describe( 'toPath', () => {
  it( 'should return correct path from circle points', () => {
    const points = [
      { x: 50, y: 30 },
      { x: 50, y: 70, curve: { type: 'arc', rx: 20, ry: 20 }},
      { x: 50, y: 30, curve: { type: 'arc', rx: 20, ry: 20 }},
    ];

    const expectedPath = 'M50,30A20,20,0,0,0,50,70A20,20,0,0,0,50,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from ellipse points', () => {
    const points = [
      { x: 100, y: 180 },
      { x: 100, y: 420, curve: { type: 'arc', rx: 65, ry: 120 }},
      { x: 100, y: 180, curve: { type: 'arc', rx: 65, ry: 120 }},
    ];

    const expectedPath = 'M100,180A65,120,0,0,0,100,420A65,120,0,0,0,100,180Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from line points', () => {
    const points = [
      { x: 10, y: 70 },
      { x: 50, y: 200 },
    ];

    const expectedPath = 'M10,70L50,200';

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

  it( 'should return correct path from polygon points', () => {
    const points = [
      { x: 20, y: 30 },
      { x: 50, y: 90 },
      { x: 20, y: 90 },
      { x: 50, y: 30 },
      { x: 20, y: 30 },
    ];

    const expectedPath = 'M20,30L50,90H20L50,30Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });

  it( 'should return correct path from rect points', () => {
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

  it( 'should return correct path from rect points (with corner radius)', () => {
    const points = [
      { x: 55, y: 50 },
      { x: 545, y: 50 },
      { x: 550, y: 60, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 550, y: 240 },
      { x: 545, y: 250, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 55, y: 250 },
      { x: 50, y: 240, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
      { x: 50, y: 60 },
      { x: 55, y: 50, curve: { type: 'arc', rx: 5, ry: 10, sweepFlag: 1 }},
    ];

    const expectedPath = 'M55,50H545A5,10,0,0,1,550,60V240A5,10,0,0,1,545,250H55A5,10,0,0,1,50,240V60A5,10,0,0,1,55,50Z';

    const path = toPath( points );

    expect( path ).toEqual( expectedPath );
  });
});
